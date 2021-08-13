const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { options } = require("request");

const app = express()

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html")
});

app.post("/", function (req, res) {

    const first_name = req.body.Fname
    const last_name = req.body.Lname
    const email_id = req.body.email

    const data = {
        members: [
            {
                email_address: email_id,
                status: "subscribed",
                merge_fields: {
                    FNAME: first_name,
                    LNAME: last_name
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);

    const url = ""; // API Ref URL

    const options = {
        method: "POST",
        auth: "" // Authour and API key here
    }

    const request = https.request(url, options, function (response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        }
        else {
            res.sendFile(__dirname + "/failure.html")
        }
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        });
    })
    request.write(jsonData);
    request.end();
});

app.post("/failure", function (req, res) {
    res.redirect("/")
});

app.listen(process.env.PORT || 3000, function (req, res) {
    console.log("Server Started at 3000");
});


