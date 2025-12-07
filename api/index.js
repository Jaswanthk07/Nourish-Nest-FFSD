import express from "express";
import mongoose from "mongoose";
import path from "path";
import session from "express-session";
import axios from "axios";
import { fileURLToPath } from "url";
import {
  signUp,
  logIn,
  deleteUser,
  getNourishusers,
} from "../src/Model/mongodb.js";
import {
  addFeedback,
  getAllFeedbacks,
  deleteFeedback,
} from "../src/Model/feedback.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db_url =
  process.env.MONGODB_URL ||
  "mongodb+srv://Koushik:1234@koushik.xbrofez.mongodb.net/NourishNest";

const connectDB = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("DB connected");
  } catch (error) {
    console.log("DB Connection Error:", error);
  }
};

const app = express();

app.set("views", path.join(process.cwd(), "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(process.cwd(), "public")));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "123",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
      mongoUrl: db_url,
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 900000,
    },
  })
);

connectDB(db_url);

app.get("/", (req, res) => {
  res.redirect("/index?role=guest");
});

app.get("/index", (req, res) => {
  let Firstname = "Guest";
  let role = req.query.role || "guest";
  if (req.session && req.session.user) {
    Firstname = req.session.user;
  } else if (req.cookies && req.cookies.user) {
    Firstname = req.cookies.user;
  }
  const isAuthenticated =
    req.session?.isAuthenticated || req.cookies?.isAuthenticated === "true";
  res.render("index", { Firstname, isAuthenticated });
});

app.get("/login", (req, res) => {
  if (
    (req.session && req.session.isAuthenticated) ||
    (req.cookies && req.cookies.isAuthenticated === "true")
  ) {
    res.send("Already Logged In");
  } else {
    res.render("login");
  }
});

app.get("/nourish", (req, res) => {
  if (
    (req.session && req.session.isAuthenticated) ||
    (req.cookies && req.cookies.isAuthenticated === "true")
  ) {
    res.redirect("/nourish&role=user");
  } else {
    res.redirect("/nourish&role=guest");
  }
});

app.get("/nourish&role=user", (req, res) => {
  const isAuthenticated =
    (req.session && req.session.isAuthenticated) ||
    (req.cookies && req.cookies.isAuthenticated === "true");
  res.render("nourish", { isAuthenticated });
});

app.get("/nourish&role=guest", (req, res) => {
  const isAuthenticated =
    (req.session && req.session.isAuthenticated) ||
    (req.cookies && req.cookies.isAuthenticated === "true");
  res.render("nourish", { isAuthenticated });
});

app.get("/about", (req, res) => {
  if (
    (req.session && req.session.isAuthenticated) ||
    (req.cookies && req.cookies.isAuthenticated === "true")
  ) {
    res.redirect("/about&role=user");
  } else {
    res.redirect("/about&role=guest");
  }
});

app.get("/about&role=user", (req, res) => {
  res.render("about");
});

app.get("/about&role=guest", (req, res) => {
  res.render("about");
});

app.get("/admin", async (req, res) => {
  if (
    (req.session && req.session.isAuthenticated) ||
    (req.cookies && req.cookies.isAuthenticated === "true")
  ) {
    if (req.cookies && req.cookies.role === "admin") {
      const result = await getNourishusers();
      res.render("admin", { users: result });
    } else {
      res.send("You are not authorized");
    }
  } else {
    res.render("permission");
  }
});

app.get("/permission", (req, res) => {
  res.render("permission");
});

app.post("/signup", async (req, res) => {
  const { username, email, password, repassword } = req.body;
  if (password === repassword) {
    try {
      const result = await signUp(username, email, password);
      if (result.success) {
        res.send("Sign Up Successful. Please Login");
      } else {
        res.send(result.msg);
      }
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.send("Password doesn't match");
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await logIn(email, password);
    if (result.success) {
      req.session.user = result.user;
      req.session.isAuthenticated = true;
      res.cookie("user", result.user, { maxAge: 900000 });
      res.cookie("role", result.role, { maxAge: 900000 });
      res.cookie("isAuthenticated", "true", { maxAge: 900000 });
      res.redirect("/");
    } else {
      res.send(result.msg);
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

app.get("/deleteUser/:email", async (req, res) => {
  if (
    (req.session && req.session.isAuthenticated) ||
    (req.cookies && req.cookies.isAuthenticated === "true")
  ) {
    const email = req.params.email;
    const result = await deleteUser(email);
    if (result.success) {
      req.session.destroy();
      res.clearCookie("user");
      res.clearCookie("role");
      res.clearCookie("isAuthenticated");
      res.redirect("/login");
    } else {
      res.send("Failed to delete user");
    }
  } else {
    res.render("permission");
  }
});

app.post("/feedback", async (req, res) => {
  const { email, feedback } = req.body;
  if (
    (req.session && req.session.isAuthenticated) ||
    (req.cookies && req.cookies.isAuthenticated === "true")
  ) {
    const result = await addFeedback(email, feedback);
    if (result.success) {
      res.send("Feedback added successfully");
    } else {
      res.status(500).send("Failed to add feedback");
    }
  } else {
    res.render("permission");
  }
});

app.get("/allfeedbacks", async (req, res) => {
  if (
    (req.session && req.session.isAuthenticated) ||
    (req.cookies && req.cookies.isAuthenticated === "true")
  ) {
    const result = await getAllFeedbacks();
    res.json(result);
  } else {
    res.render("permission");
  }
});

app.get("/deletefeedback/:id", async (req, res) => {
  if (
    (req.session && req.session.isAuthenticated) ||
    (req.cookies && req.cookies.isAuthenticated === "true")
  ) {
    const feedbackId = req.params.id;
    const result = await deleteFeedback(feedbackId);
    if (result.success) {
      res.send("Feedback deleted successfully");
    } else {
      res.status(500).send("Failed to delete feedback");
    }
  } else {
    console.log("Not Admin");
  }
});

app.get("/mealplan", async (req, res) => {
  try {
    if (
      (req.session && req.session.isAuthenticated) ||
      (req.cookies && req.cookies.isAuthenticated === "true")
    ) {
      const apiKey = "236eda03c9c04e22bd7f7ec803985287";
      const hash = "4b5v4398573406";
      const diet = req.query.diet || "Gulten Free";
      const targetCalories = req.query.targetCalories || "2000";
      var apiUrl;
      if (
        req.query.diet &&
        req.query.targetCalories &&
        req.query.diet !== "Gulten Free" &&
        req.query.targetCalories !== "2000"
      ) {
        apiUrl = `https://api.spoonacular.com/mealplanner/generate?apiKey=${apiKey}&hash=${hash}&timeFrame=day&targetCalories=${targetCalories}&diet=${diet}`;
      } else {
        apiUrl = `https://api.spoonacular.com/mealplanner/generate?apiKey=${apiKey}&hash=${hash}&timeFrame=day&targetCalories=2000&diet=Gulten Free`;
      }
      const response = await axios.get(apiUrl);
      const mealPlan = response.data;
      res.render("mealplan", { mealPlan });
    } else {
      res.render("permission");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

app.get("/recipes/:id", async (req, res) => {
  try {
    if (
      (req.session && req.session.isAuthenticated) ||
      (req.cookies && req.cookies.isAuthenticated === "true")
    ) {
      const apiKey = "9ca54163f3764560a75ecba555e0d379";
      const recipeId = req.params.id;
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}&includeNutrition=true`
      );
      const recipes = response.data;
      const recipeSteps = recipes.analyzedInstructions[0].steps;
      const nutrition = recipes.nutrition;
      res.render("recipes", { recipes, recipeSteps, nutrition });
    } else {
      res.render("permission");
    }
  } catch (error) {
    console.error("Error fetching recipe data:", error);
    res.status(500).send("Error fetching recipe data");
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.clearCookie("user");
  res.clearCookie("role");
  res.clearCookie("isAuthenticated");
  res.redirect("/login");
  console.log("You have logged out !!!");
});

export default app;
