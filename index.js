var express = require('express');
var app = express();
const nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var cors = require('cors');
const axios = require('axios')
var fs = require('fs');
var mongoDb = require('./Modules/MongoDb')
// const localtunnel = require('localtunnel');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));
app.use(express.urlencoded({
    extended: false, // Whether to use algorithm that can handle non-flat data strutures
    limit: 10000, // Limit payload size in bytes
    parameterLimit: 2, // Limit number of form items on payload
}));


// let tunnelUrl;


// (async () => {
//     const tunnel = await localtunnel({ port: 5000 });

//     // the assigned public url for your tunnel
//     // i.e. https://abcdefgjhij.localtunnel.me
//     tunnelUrl = tunnel.url
//     console.log(tunnelUrl);

//     // tunnel.on('close', () => {
//     //     // tunnels are closed
//     // });
// })();


app.use(express.static('public'));
// app.use(express.static('private'));

app.listen(5000, (err) => {
    if (err) throw err;
    else console.log('Listening on 5000');
})

var count = 0;
var _id, _subject, _email;

// mongoDb.run();

app.post("/email/:email", async (req, res) => {
    const { id, subject, content } = req.body;
    const { email } = req.params;
    console.log(req.params, req.body);


    var transporter = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "campaign.lifecycle@gmail.com",
            pass: "zptazhhynvqljmew"
        }
    });

    var mailOptionsPublic = {
        from: 'campaign.lifecycle@gmail.com',
        to: 'chinmay.limje@expleogroup.com',
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
                <img src="https://3d54-103-6-167-50.ngrok-free.app//pixel?id=${id}&subject=${subject}&email=${email}"
                alt="">
                <a href="https://3d54-103-6-167-50.ngrok-free.app//read" target="_blank">Track</a>
            
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
                <img src="http://localhost:5000/pixel?id=${id}&subject=${subject}$email=${email}"
                alt="">
                <a href="http://localhost:5000/read" target="_blank">Track</a>
            </body>
            </html>
        `,
    }

    console.log(mailOptionsPublic)

    await transporter.sendMail(mailOptionsPublic, async function (error, info) {
        if (error) {
            await res.json({ status: error });
        } else {
            console.log(info)
            await res.json({ status: 'Success' });
        }
    });

})

app.get("/pixel", async (req, res) => {
    console.log(req.query);
    let { id, subject, email } = req.query;
    // console.log(req.body);
    count++;
    console.log(id, subject, email);
    _id = id;
    _subject = subject;
    _email = email;

    // mongoDb.write(_id, _subject, _email)
    // let myObj = {
    //     CVID: "sadadas",
    //     TAID: "afwqedasa"
    // }

    // axios.post("http://localhost:8080/rest/ecemailtrackingservice/v1/email_tracker/main",
    //    " CVID: ",{
    //     headers:{

    //     }
    //    }
    // )
    // .then((result) => {
    //     console.log(result.data)
    // })

    // let Obj = {
    //     id: id,
    //     subject: subject,
    //     email: email,
    //     count: 1
    // }

    // let filename = email.split("@")[0];

    // let filePath = "./Database/" + filename + ".json"

    // email.split("@")[0];

    // console.log(email.split("@")[0])


    // console.error("Exist")
    // fs.readFile(filePath, 'utf8', (err, data) => {
    //     if (err) {
    //         console.error('Error reading file:', err);
    //         fs.writeFile(filePath, JSON.stringify(Obj, null, 2), function (err, result) {
    //             if (err) console.log('error', err);
    //         });
    //         return;
    //     }

    //     try {
    //         const jsonData = JSON.parse(data);
    //         jsonData.count = jsonData.count + 1;

    //         fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
    //             if (err) {
    //                 console.error('Error writing file:', err);
    //             } else {
    //                 console.log('Count updated successfully.');
    //             }
    //         });
    //     } catch (parseError) {
    //         console.error('Error parsing JSON:', parseError);
    //     }
    // });

    res.json({ status: 'ok' });

})


app.get("/count", (req, res) => {
    res.json({ id: _id, subject: _subject, email: _email, count: count });
})

app.get("/reset", (req, res) => {
    count = 0;
    res.json({ count: count })
})

app.get("/verify", (req, res) => {
    count = 0;
    res.send( "verification complete" );
})

