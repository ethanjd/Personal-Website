const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

//create constants with relative paths to views and partials
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars as the view engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
// app.use(express.static(path.join(__dirname, '../public')))

app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => { 
    res.render('index', {
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

app.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Contact Me',
        name: 'Ethan Dsouza'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: 'Page Not Found',
        name: 'Ethan Dsouza'
    })
})

app.listen(3000, () =>{
    console.log('Server is up in port 3000')
})