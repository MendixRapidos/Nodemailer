var express = require('express');
var app = express();
const nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var cors = require('cors');

var emailBody1 = 
`<div><h3>Hello!!</h3><p>This is test to track Email</p><img src="http://localhost:5000/read/chinmay" style="display:none"></div>`

var emailBody2 = 
`<div><h3>Hello!!</h3><p>This is test to track Email</p><script>
fetch("http://localhost:5000/read")
</script></div>`

var emailBody3 = 
`<div><h3>Hello!!</h3><p>This is test to track Email</p><script>
fetch("http://localhost:5000/read")
</script></div>
<a href="http://localhost:5000/read" target="_blank" >Track</a>`

var emailBody4 = 
`<body onload="load()">
<div><h3>Hello!!</h3><p>This is test to track Email</p><script>
    function load(){
        fetch("http://localhost:5000/read")
    }
</script></div>
<a href="http://localhost:5000/read" target="_blank" >Track</a>

</body>`

var emailBody5 = `

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body onload="load()">
    <div><h3>Hello!!</h3><p>This is test to track Email</p><script>
        function load(){
            fetch("http://localhost:5000/pixel")
        }
        window.onload = load();
    </script></div>
    <a href="http://localhost:5000/read" target="_blank" >Track</a>
    
</body>
</html>

`

var emailBody6 = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div><h3>Hello!!</h3><p>This is test to track Email</p>
    <button onclick="load()">Hi</button>
    <script>
        function load(){
            fetch("http://localhost:5000/pixel")
        }
    </script></div>
    <img src="./inno.jfif" alt="">
    <a href="http://localhost:5000/read" target="_blank" >Track</a>
    
</body>
</html>
`



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));

app.listen(5000, (err) => {
    if (err) throw err;
    else console.log('Listening on 5000');
})

var count = 0;

async function send() {
    
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "campaign.lifecycle@gmail.com",
            pass: "zptazhhynvqljmew"
        }
    });

    var mailOptions = {
        from: 'campaign.lifecycle@gmail.com',
        to: 'chinmay.limje@expleogroup.com',
        subject: 'Node js Testing',
        html: emailBody6,

    }

    transporter.sendMail(mailOptions, async function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log(info)
        }
    });

}

// send();

app.get("/send", async(req, res)=>{
    await send();
    console.log("Original Count: "+count)
    res.send("Sent success")
})

app.get("/read", (req, res)=>{
    console.log(req.body)
    count++;
    console.log("After read Count: "+count);
    res.send({ read: "success", count: count });
})

app.get("/pixel", (req, res)=>{
    // console.log(req.params['recipient']);
    // console.log(req.query);
    console.log(req.body);
    count++;
    console.log("After read Count: "+count);
    res.send({ read: "success", count: count });
})