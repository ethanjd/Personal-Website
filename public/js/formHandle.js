const contactForm = document.querySelector('.contactForm')
const formSuccess = document.getElementById('formSuccess')
const formFailed = document.getElementById('formFailed')
const submitButton = document.getElementById('submitButton')

let name = document.getElementById('nameInput');
let email = document.getElementById('emailInput');
let subject = document.getElementById('subjectInput');
let message = document.getElementById('messageInput');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); 

    let formData = {
        name: name.value,
        email: email.value.trim(),
        subject: subject.value,
        message: message.value
    }

    async function postData() {
        const response = await fetch('/contact', {
            method: 'POST',
            headers: new Headers( {
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(formData),
        });
        return response.json();
    }

    postData()
        .then(data => {
            if(data.success) {
                formSuccess.hidden = false;
            } else {
                formFailed.hidden = false;
            }
        })
        .catch((error) => {
        console.log('Error:', error);
        });

})