// const sgMail = require('@sendgrid/mail')
const nodemailer = require('nodemailer');
// sgMail.setApiKey('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')
// const msg = {
//   to: 'chinmay.limje@expleogroup.com', // Change to your recipient
//   from: 'campaign.lifecycle@gmail.com', // Change to your verified sender
//   subject: 'Sending with Node is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })


var transporter =  nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "campaign.lifecycle@gmail.com",
        pass: "zptazhhynvqljmew"
    }
});

var mailOptionsPublic = {
    from: 'campaign.lifecycle@gmail.com',
    to: 'chinmay.limj@expleogroup.com',
    subject: "subject",
    html:
        `
        <!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        
        <body onload="load()">
            <div>
                <h3>Hello!!</h3>
                
            </div>
            <img src="https://3d54-103-6-167-50.ngrok-free.app//pixel?id=$&subject=&email="
            alt="">
            <a href="https://3d54-103-6-167-50.ngrok-free.app//read" target="_blank">Track</a>
        
        </body>
        
        </html>
    `,
}

var mailOptionsPrivate = {
    from: 'campaign.lifecycle@gmail.com',
    to: "email",
    subject: "subject",
    html:
        `
        <!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        
        <body onload="load()">
            <div>
                <h3>Hello!!</h3>
                
                <script>
                    function load() {
                        let params = { subject:  };
                        let baseurl = "http://localhost:5000/pixel";
                        let newUrl = new URL(baseurl);
                        newUrl.search = new URLSearchParams(params).toString();
                        fetch(url)
                            .then(response => response.json())
                            .then(data => console.log(data))
                    }
                </script>
            </div>
            <img src="http://localhost:5000/pixel?id=&subject=
            alt="">
            <a href="http://localhost:5000/read" target="_blank">Track</a>
        </body>
        </html>
    `,
}

console.log(mailOptionsPublic)

 transporter.sendMail(mailOptionsPublic, async function (error, info) {
    if (error) {
       console.log({ status: error });
    } else {
        console.log(info)
        console.log({ status: 'Success' });
    }
});