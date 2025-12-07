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
} from "../Model/mongodb.js";
import {
  addFeedback,
  getAllFeedbacks,
  deleteFeedback,
} from "../Model/feedback.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set("views", path.join(process.cwd(), "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "../../public")));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(
  session({
    secret: "123",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 900000,
    },
  })
);

const db_url =
  process.env.MONGODB_URL ||
  "mongodb+srv://Koushik:1234@koushik.xbrofez.mongodb.net/NourishNest";
const connectDB = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("DB connected");
  } catch (error) {
    console.log(error);
  }
};
connectDB(db_url);

// Helper function to get user data from session/cookies
function getUserData(req) {
  let Firstname = "Guest";
  let role = "guest";
  let isAuthenticated = false;

  if (req.session && req.session.user) {
    Firstname = req.session.user;
    role = req.session.role || "user";
    isAuthenticated = req.session.isAuthenticated || false;
  } else if (req.cookies && req.cookies.user) {
    Firstname = req.cookies.user;
    role = req.cookies.role || "user";
    isAuthenticated = req.cookies.isAuthenticated === "true";
  }

  return { Firstname, role, isAuthenticated };
}

app.get("/", (req, res) => {
  res.redirect("/index");
});

app.get("/index", (req, res) => {
  const { Firstname, role, isAuthenticated } = getUserData(req);
  res.render("index", { Firstname, isAuthenticated, role });
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
  const { Firstname, role, isAuthenticated } = getUserData(req);
  res.render("nourish", { isAuthenticated, Firstname, role });
});

app.get("/about", (req, res) => {
  const { Firstname, role, isAuthenticated } = getUserData(req);
  res.render("about", { isAuthenticated, Firstname, role });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const loginResult = await logIn(email, password);
    if (loginResult.success) {
      console.log("You have successfully logged in");
      req.session.user = loginResult.message;
      req.session.isAuthenticated = true;
      req.session.role = loginResult.role;
      res.cookie("user", loginResult.message, {
        maxAge: 900000,
        httpOnly: true,
      });
      res.cookie("role", loginResult.role, {
        maxAge: 900000,
        httpOnly: true,
      });
      res.cookie("isAuthenticated", "true", { maxAge: 900000, httpOnly: true });
      console.log(req.session.user);
      res.redirect("/index");
    } else {
      console.log(loginResult.message);
      res.status(400).send("Invalid email or password");
    }
  } catch (error) {
    console.error("An error occurred while logging in:", error);
    res.status(500).send("An error occurred while logging in");
  }
});

app.post("/signup", async (req, res) => {
  const { Firstname, Lastname, email, password, repassword, role } = req.body;
  try {
    // Validate passwords match
    if (password !== repassword) {
      return res.send("Passwords don't match");
    }

    // Check if passwords are empty
    if (!password || password.trim() === "") {
      return res.send("Password cannot be empty");
    }

    const result = await signUp(Firstname, Lastname, email, password);
    if (result.success) {
      req.session.user = Firstname;
      req.session.isAuthenticated = true;
      req.session.role = "user";
      res.cookie("user", Firstname, { maxAge: 900000, httpOnly: true });
      res.cookie("role", "user", { maxAge: 900000, httpOnly: true });
      res.cookie("isAuthenticated", "true", { maxAge: 900000, httpOnly: true });
      console.log(req.session.user);
      res.redirect("/index");
    } else {
      res.send(result.message);
    }
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/about", async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const result = await addFeedback(name, email, message);
    if (result.success) {
      res.json(req.body);
    } else {
      res.send(result.message);
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred.");
  }
});

app.get("/admin", async (req, res) => {
  try {
    if (
      (req.session &&
        req.session.isAuthenticated &&
        req.session.role === "admin") ||
      (req.cookies &&
        req.cookies.isAuthenticated === "true" &&
        req.cookies.role === "admin")
    ) {
      const users = await getNourishusers();
      const feedbacks = await getAllFeedbacks();
      res.render("admin", { users: users, feedbacks: feedbacks });
    } else {
      res.render("permission");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/admin/:id", async (req, res) => {
  if (
    (req.session &&
      req.session.isAuthenticated &&
      req.session.role === "admin") ||
    (req.cookies &&
      req.cookies.isAuthenticated === "true" &&
      req.cookies.role === "admin")
  ) {
    const id = req.params.id;
    console.log(id);
    const result = await deleteUser(id);
    if (result.success) {
      res.send("User deleted successfully");
    } else {
      res.status(500).send("Failed to delete user");
    }
  } else {
    console.log("Not Admin");
  }
});

app.post("/admin/feedbacks/:id", async (req, res) => {
  if (
    (req.session &&
      req.session.isAuthenticated &&
      req.session.role === "admin") ||
    (req.cookies &&
      req.cookies.isAuthenticated === "true" &&
      req.cookies.role === "admin")
  ) {
    const id = req.params.id;
    console.log(id);
    const result = await deleteFeedback(id);
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
    const { Firstname, role, isAuthenticated } = getUserData(req);
    if (isAuthenticated) {
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
      res.render("mealplan", { mealPlan, Firstname, role, isAuthenticated });
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
    const { Firstname, role, isAuthenticated } = getUserData(req);
    if (isAuthenticated) {
      const apiKey = "9ca54163f3764560a75ecba555e0d379";
      const recipeId = req.params.id;
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}&includeNutrition=true`
      );
      const recipes = response.data;
      // Guard against missing analyzedInstructions
      const recipeSteps =
        recipes.analyzedInstructions &&
        recipes.analyzedInstructions.length > 0 &&
        Array.isArray(recipes.analyzedInstructions[0].steps)
          ? recipes.analyzedInstructions[0].steps
          : [];
      const nutrition = recipes.nutrition || {};
      res.render("recipes", {
        recipes,
        recipeSteps,
        nutrition,
        Firstname,
        role,
        isAuthenticated,
      });
    } else {
      res.render("permission");
    }
  } catch (error) {
    console.error("Error fetching recipe data:", error);
    res.status(500).send("Error fetching recipe data");
  }
});

// Generic error handler to catch unexpected errors and log stack traces
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err && err.stack ? err.stack : err);
  res.status(500).send("Internal Server Error");
});

app.post("/logout", (req, res) => {
  // destroy session and then clear cookies + redirect to homepage
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session during logout:", err);
        // still attempt to clear cookies and redirect
      }
      res.clearCookie("user");
      res.clearCookie("role");
      res.clearCookie("isAuthenticated");
      console.log("You have logged out !!!");
      // redirect to homepage so user sees logged-out state
      return res.redirect("/index");
    });
  } else {
    res.clearCookie("user");
    res.clearCookie("role");
    res.clearCookie("isAuthenticated");
    console.log("You have logged out (no session) !!!");
    return res.redirect("/index");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000/");
});
