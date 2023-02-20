const express = require("express");
const bodyParser = require("body-parser");
//const date = require(__dirname + "/date.js"); //for using external file with node in line 20

//database starting
const mongoose = require("mongoose");
require('dotenv').config();
const api_key=process.env.API_KEY;
mongoose.set("strictQuery", false);
mongoose.connect("mongodb+srv://"+api_key, () => {
  console.log(`Connected to MongoDB`);
});

const itemsSchema = {
  //create schema
  name: { type: String, required: true },
};

const Item = mongoose.model("Item", itemsSchema); //create collection

const firstItem = new Item({
  //create first document of item collection
  name: "Welcome to your todolist!",
});

const secondItem = new Item({
  //create first document of item collection
  name: "Hit the + button to add a new item.",
});
const thirdItem = new Item({
  //create first document of item collection
  name: "<-- Hit this to delete an item.",
});

//firstItem.save();
const defaultItems = [firstItem, secondItem, thirdItem];

//database ending

const app = express();
//const items = []; // for new to to item

const workItems = []; //for other page's data.

app.use(bodyParser.urlencoded({ extended: true })); // for fatch data by post req.

app.use(express.static("public")); // for dynamic addition of css.

app.set("view engine", "ejs"); //handover to ejs


//make a views folder and put the render file in that folder for ejs rending

app.get("/", function (req, res) {
  //when user want home page.
  Item.find({}, function (err, foundItems) {
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("inserted!");
        }
      });
      res.redirect("/"); //kyuki bar bar item save na ho default wale, agar aray khali ho toh hi
      //save, or save hoke redirect ho jaye home pe toh updated page milega.
    } else {
      console.log(foundItems);
      res.render("list", { listTittle: "Today", newToDo: foundItems }); // we used render to rend the page ie list
    }
  });

  //let day = date.getDate(); // export date.js which export with the help of nord.
});

app.post("/", function (req, res) {
  const itemName = req.body.newitem;

  const newItem = new Item({ name: itemName });
  newItem.save();
  res.redirect("/")
});

app.post("/delete", function(req,res){//handle the form submition of delete route, check in ejs
  const checkedItemId= req.body.checkbox
  Item.findByIdAndRemove(checkedItemId, function(err){
    if(err){
      console.log(err)
    }else{
      console.log("deleted!")
    }
  });
  res.redirect("/");
})

app.get("/work", function (req, res) {
  res.render("list", { listTittle: "work list", newToDo: workItems });
  // we use list.ejs template whereever we want to use.like here we use in work
});

app.listen(3000||process.env.PORT, function (req, res) {
  console.log("ha by ladke! ok report, Khich de kaam 3000 pe!");
});

//process is called templating ie passing data throug the server to our tempelate which id made in view.ejs

//date

// var today= new Date()
//
// if (today.getDay()===6 || today.getDay()===0){
//   rers.send("yay! it's the weekend.")
// }
//
// else {
//   res.send("Boo! get ready for work.")
// }

//res.send("<h1>" + day + "</h1>") // send html file through express.

//if we want to send many html tags then,
// res.write ("<p> yeh yeh mze </p>")
// res.write("<h1> how are you today? </h1>")
// res.send() // when you done.
