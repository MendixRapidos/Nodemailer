var express = require('express');
var app = express();
const nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));

app.use(express.static('public'));
// app.use(express.static('private'));

app.listen(5000, (err) => {
    if (err) throw err;
    else console.log('Listening on 5000');
})

// console.log(emailBody6)

var count = 0;

async function send(email, subject) {



}

// send();

app.get("/send", async (req, res) => {
    await send();
    console.log("Original Count: " + count)
    res.send("Sent success")
})

app.get("/read", (req, res) => {
    console.log(req.body)
    count++;
    console.log("After read Count: " + count);
    res.send({ read: "success", count: count });
})

app.get("/pixel", (req, res) => {
    console.log(req.query);
    // console.log(req.body);
    count++;
    // console.log("Subject: " + req.body.subject);
    console.log("After read Count: " + count);

    res.json({ read: "success", count: count });
})

app.get("/count", (req, res) => {
    res.json({ count: count })
})

app.post("/email", async (req, res) => {
    const {id, email, subject, content } = req.body;

    // console.log("triggered");
    // console.log(req.body);
    // if(req.body == null)
    //     res.json("empty")
    // else
    //     res.json("triggered");

    var transporter = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "campaign.lifecycle@gmail.com",
            pass: "zptazhhynvqljmew"
        }
    });

    var mailOptionsPublic = {
        from: 'campaign.lifecycle@gmail.com',
        to: email,
        subject: subject,
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
                    ${content}
                </div>
                <img src="https://node-mailer-zq2s.onrender.com/pixel?id=${id}&subject=${subject}"
                alt="">
                <a href="https://node-mailer-zq2s.onrender.com/read" target="_blank">Track</a>
            
            </body>
            
            </html>
        `,
    }

    var mailOptionsPrivate = {
        from: 'campaign.lifecycle@gmail.com',
        to: email,
        subject: subject,
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
                    ${content}
                    <script>
                        function load() {
                            let params = { subject: '${subject}' };
                            let baseurl = "http://localhost:5000/pixel";
                            let newUrl = new URL(baseurl);
                            newUrl.search = new URLSearchParams(params).toString();
                            fetch(url)
                                .then(response => response.json())
                                .then(data => console.log(data))
                        }
                    </script>
                </div>
                <img src="http://localhost:5000/pixel?id=${id}&subject=${subject}"
                alt="">
                <a href="http://localhost:5000/read" target="_blank">Track</a>
            </body>
            </html>
        `,
    }

    // console.log(mailOptionsPrivate)


    await transporter.sendMail(mailOptionsPublic, async function (error, info) {
        if (error) {
            await res.json({ status: error });
        } else {
            console.log(info)
            await res.json({ status: 'Success' });
        }
    });

})

app.get("/reset", (req, res) => {
    count = 0;
    res.json({ count: count })
})

app.get("/email", (req, res)=>{
    console.log(req.query);
})