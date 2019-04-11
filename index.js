const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // Import of the model Recipe from './models/Recipe'
const data = require("./data.js"); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
    .connect("mongodb://localhost/recipeApp", { useNewUrlParser: true })
    .then(() => {
        console.log("Connected to Mongo!");
        return mongoose.connection.dropCollection("recipes");
    })
    .catch(err => {
        console.error("Error connecting to mongo", err);
    });

Recipe.create({
    title: "Nyhtökaurapata",
    level: "Amateur Chef",
    ingredients: ["nyhtökaura", "sipuli", "tomaattimurska"],
    cuisine: "Finnish",
    dishType: "Dish",
    duration: 30,
    creator: "Helleke",
})
    .then(peruna => {
        console.log(peruna.title);
        return Recipe.insertMany(data);
    })
    .then(createdRecipes => {
        createdRecipes.forEach(el => {
            console.log(el.title);
        });
        return Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 });
    })
    .then(() => {
        console.log("recipe updated");
        return Recipe.deleteOne({ title: "Carrot Cake" });
    })
    .then(() => {
        console.log("Carrot cake deleted!");
        return mongoose.disconnect();
    })
    .then(() => {
        console.log(mongoose.connection.readyState);
    })
    .catch(err => {
        console.error("Error!", err);
    });
