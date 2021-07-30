const path = require('path')
const fs = require('fs')
const http = require('http')
const https = require('https')
const express = require('express')
const hbs = require('hbs')
const nodemailer = require('nodemailer')

require('dotenv').config()

// const cert = fs.readFileSync('ssl/www_ethanjd_com.crt')
// const ca = fs.readFileSync('ssl/www_ethanjd_com.ca-bundle')
// const key = fs.readFileSync('csr/ethanjd_com.key')
// const httpsOptions = {
//     cert,
//     ca,
//     key
// }

const app = express()
const httpServer = http.createServer(app)
// const httpsServer = https.createServer(httpsOptions, app)
const port = process.env.PORT || 0
const host = process.env.HOST || '0.0.0.0'

//create constants with relative paths to views and partials
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars as the view engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(path.join(__dirname, '../public')))
app.use(express.json());

app.get('', (req, res) => { 
    res.render('about', {
        title: 'Home Page',
        name: 'Ethan Dsouza'
    })
})

app.get('/projects', (req, res) => {
    res.render('projects', {
        title: 'Projects',
        name: 'Ethan Dsouza'
    })
})

app.get('/experience', (req, res) => {
    res.render('experience', {
        title: 'Experience',
        name: 'Ethan Dsouza'
    })
})

app.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Contact Me',
        name: 'Ethan Dsouza'
    })
})

app.post('/contact', (req, res) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.office365.com",
        port: 587,
        secure: false, // upgrade later with STARTTLS
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    })

    const mailOptions = {
        from: `ethanjd.com <ethanjd.com@hotmail.com>`,
        to: 'ethandsouza2@gmail.com',
        subject: `Message from ${req.body.name} via ethanjd.com`,
        text: 
            `Message from ${req.body.name} (${req.body.email})\nRegarding '${req.body.subject}'\n\n${req.body.message}`,
    }

    transporter.sendMail(mailOptions, (error, info) =>{
        if(error) {
            console.log(error)
            res.json({success: false})
        } else {
            console.log(info.response)
            res.json({success: true})
        }

    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: 'Page Not Found',
        name: 'Ethan Dsouza'
    })
})

// app.use((req, res, next) => {
//     if(req.protocol === 'http') {
//       res.redirect(301, `https://${req.headers.host}${req.url}`);
//     }
//     next();
//  });


// Server listen on localhost

app.listen(3000, () =>{
    console.log('Server is up in port ' + port)
})

// httpServer.listen(3000, host, () => {
//     console.log('HTTP server is up in port ' + httpServer.address().port)
// })

// httpsServer.listen(port, host, () => {
//     console.log('HTTPS server is up in port ' + httpsServer.address().port)
// })



