require('dotenv').config();
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const router = express.Router();
const cors = require('cors')
// const Cookies = require('js-cookie')

app.use(cors());
app.use(cookieParser());

app.use(router)


// Taking permission from express to accept JSON data otherwise it will be undefined
router.use(express.json());

const PORT = 5000;


// ROUTING PAGES

router.get("/", (req, res) => {
  res.send("Welcome");
});

router.get("/home", (req, res) => {
  res.send("Hello Home");
});

app.listen(PORT, console.log(`Server Started at ${PORT}`));

// Connection To DATA BASE

const mongoose = require("mongoose");

// const db = process.env.REACT_APP_DB;
const db = "mongodb+srv://Ankush9120:9120887878@cluster0.9tcj5v0.mongodb.net/?retryWrites=true&w=majority";
console.log(db)

mongoose.set("strictQuery", true);

mongoose
  .connect(db)
  .then(() => {
    console.log("DB connection stablished");
  })
  .catch((err) => console.log(err));

// SCHEMA - SCHEMA Defines The Structure of the Document

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  messages: [
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      }
    }
  ],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// Hashing Password 🔐

const bcrypt = require("bcryptjs");

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  next();
});

// Creating & Storing Auth Token
const jwt = require("jsonwebtoken");
const jwtkey = process.env.REACT_APP_JWT

userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign(
      { id: this._id }, "REACT_APP_JWT=HelloMyNameIsAnkushGuptaAndMyBranchIsMCA"
    );
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    console.log("Token created and saved in DB")
    return token;
  } catch (err) {
    console.log(err);
  }
};

// Storing messages

userSchema.methods.addMessage = async function (name, email, phone, message) {
  try {
    this.messages = this.messages.concat({ name, email, phone, message });
    await this.save();
    return this.messages;
  } catch (err) {
    console.log(err);
  }
};

// Creating new Collection User with help of - MODELS
const User = new mongoose.model("User", userSchema);

// Register USER

router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, password, cpassword } = req.body;

    // Checking all fields filled or not
    if (!name || !email || !phone || !password || !cpassword) {
      return res.status(401).send({ message: "Please fill All details" });
    }

    try {
      // Finding If User already exists
      const userExist = await User.findOne({ email: email });
      if (userExist) {
        return res.status(401).send({ message: "User Already Exists" });
      } else if (password !== cpassword) {
        return res.status(401).send({ message: "Password Not Matching" });
      } else {
        // Creating New User if everything fine
        await new User(req.body).save();
        res.send({ message: "User Registered" });
      }
    } catch (err) {
      res.send(err);
    }
  } catch (err) {
    res.status(404).send(err);
  }
});

// LOGIN USER

router.post("/login", async (req, res) => {

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.send({ message: "Fill all the Credentials" });
    }

    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const userPass = await bcrypt.compare(password, userLogin.password);

      if (userPass) {

        // Generating Auth Token
        const token = await userLogin.generateAuthToken();
        
        // storing token in cookie
        
        res.cookie("jwtoken", token , {
          expires: new Date(Date.now() + 10000000),
          secure: true
        });

        // Cookies.set('jwtoken' , token)

        console.log("Your Token is : ", token);

        console.log(req.body);
        
        res.status(201).send({ message: "Login successfully" });
      } else {
        res.send({ message: "Inavlid Details - Pass" });
      }
    } else {
      res.send({ message: "Invalid Details - Email" });
    }
  } catch (err) {
    res.send(err);
  }

});


// Authentication of WEB Token

const authenticate = async (req, res, next) => {
  try {
    console.log("Entered in Authentication");

    // get jwt token from cookies
    const token = req.cookie.jwtoken;
    // const token = Cookies.get('jwtoken')

    // Verifying our token with secret key
    const verifyToken = jwt.verify(
      token, jwtkey
    );

    // get user data from token, if token id(from cookies)===tokens.token

    const rootUser = await User.findOne({
      _id: verifyToken.id,
      "tokens.token": token,
    });

    if (!rootUser) {
      throw new Error("User Not Found");
    }

    console.log(`User Found : ${rootUser.name}`);
    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;

    next();
  } catch (err) {
    res.status(401).send("Unauthorized : No token");
    console.log(err);
  }
};

// ABOUT PAGE

router.get("/about", authenticate, (req, res) => {
  // Sending Root User Request to Front-End

  res.send(req.rootUser);
  console.log("about request sent to front-end : ");
});

// Getting User Details for Contact Us & Home Page

router.get("/getdata", authenticate ,(req, res) => {
  // Sending Root User Request to Front-End

  res.send(req.rootUser);
  console.log(rootUser)
  console.log(req.rootUser)
  res.send(console.log("Data Sent To FrontEND"))
});

//Getting Contact Us Data & storing in DB

router.post("/contact", authenticate, async (req, res) => {
  try {
    console.log("Getting data of contact from front end");
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      res.send({ message: "Fill all the data" });
    }

    const contactUser = req.rootUser;

    if (contactUser) {
      await contactUser.addMessage(name,email,phone,message);
      await contactUser.save();
    }

    res.status(201).send({ message: "User Message Updated" });

  } catch (err) {
    console.log(err);
  }
});


router.get('/logout' ,(req,res)=>{
  console.log("Log out request recieved")
  res.clearCookie('jwtoken' , {path : '/'})
  res.status(200).send({message : "Logout Succesfully"})
})
