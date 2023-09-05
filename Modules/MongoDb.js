
const { response } = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Officepc:Officepc@cluster0.faxvj.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

client.connect();

var db = client.db("Mendix_Mailer");
db.command({ ping: 1 });
console.log("Pinged your deployment. You successfully connected to MongoDB!");
var responseData = db.collection("Mailer_Response");

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        var cursor = responseData.find({});
        for await (const doc of cursor) {
            console.log(doc);
        }
    } catch (error) {
        throw error;
    }
}

async function write(_id, _subject, _email) {
    try {

        var cursor = await responseData.findOne({ id: _id, email: _email });
        if (cursor == null) {
            let trackingResponse = {
                id: _id,
                subject: _subject,
                email: _email,
                count: 0
            }

            var insertQuery = await responseData.insertOne(trackingResponse);
            console.log(`A document was inserted with the _id: ${insertQuery.insertedId}`);

        }
        else {

            newCount = cursor.count + 1;

            let updateCount = {
                $set: {
                    count: newCount
                }
            }

            responseData.updateOne({id: _id, email: _email}, updateCount);
            console.log(`A document was Updated with the _id: ${_id}`);
        }

    } catch (error) {
        throw error
    }
}

// write('${id}', null, null);

module.exports = {
    run, write
}
