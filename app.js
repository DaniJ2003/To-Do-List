const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const app = express();


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//To remove Warning
mongoose.set('strictQuery', false);

//DB connection

mongoose.connect(process.env.MongoDB_URI, {useNewUrlParser: true}).then(() =>{
    console.log("Connected to DB");
})
.catch((err)=>{
    console.log(err);
})

//DB Schema
const listSchema = new mongoose.Schema({
    name: String
});

//DB Model
const List = mongoose.model("lists", listSchema);



app.get("/", function(req, res) {
    const day = date.getDate();
    const items = [];
    List.find((err, lists) => {
        if(err) 
            console.log(err);
        else {
            lists.forEach((eachList) => {
                items.push(eachList.name);
            })
            items.reverse();
            res.render("list", {listTitle: day, NewListItem: items});
        } 
    })  
});

app.post("/", function(req, res) {
    let item = req.body.newList;
    let count;
    List.find({name: item}, (err, data) => {
        if(err)
            console.log(err);
        else {
            count = data.length;
            // console.log(count);
            if(count == 0) {
                const newList = new List({
                    name: item
                });
                newList.save();
                res.redirect("/");
            }
            else res.redirect("/");
        }
    });
     
});

app.post("/delete", (req, res) => {
    let item = req.body.CBox;
    // console.log(item);
    List.findOneAndDelete({name: item}, (err) => {
        if(err) console.log(err);
        else {
            console.log("Deleted successfully");
            res.redirect("/");
        }
    })
})

app.listen(3000, function() {
    console.log("Server is running on port 3000");
});



