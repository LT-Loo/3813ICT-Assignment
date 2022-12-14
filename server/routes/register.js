/* Route to create new user */

const bcrypt = require("bcrypt");

module.exports = function(db, app) {
    app.post("/register", async function (req, res) {

        if (!req.body) {return res.sendStatus(400);}

        let data = req.body;
        data.password = await bcrypt.hash("password", 10); // Encrypt password
        data.pfp = "user.png";

        // Insert user
        const collection = db.collection("user");
        let result = await collection.insertOne(data);
        let msg = `New user added successfully into database.`;
        console.log(msg);

        if (result.acknowledged) {
            let item = await collection.findOne({"_id": result.insertedId}); // Return user data
            return res.send({success: true, item: item});
        }
        else {return res.send({success: false});}
    });
}