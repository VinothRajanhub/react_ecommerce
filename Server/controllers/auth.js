// For Understanding

// exports.signup = (req,res) => {
//     // In postMan Headers - key -> Content-Type  ,  Body -> raw { "firstname": "Vinoth","lastname": "Rajan"}
//     // Console O/P - Req { firstname: 'Vinoth', lastname: 'Rajan' }
//     console.log("Req",req.body)
//     res.send("Signed Up")
// };

// To save in DB   
// By postMan // {  "name": "Vinoth", "lastname": "Rajan","email": "vr@demo.com", "password": "Demo@123" }

const User = require("../models/user");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "NOT able to save user in DB"
      });
    }
    //  // In postMan Headers - key -> Content-Type  ,  Body -> raw { "firstname": "Vinoth","lastname": "Rajan"}
    // // Console O/P - Req { firstname: 'Vinoth', lastname: 'Rajan' }
    // console.log("Req",req.body)

    // // { "name": "Vinoth","lastname": "Rajan","email": "vr@demo.com","password": "Demo@123"}
    res.json({
      name: user.name,
      email: user.email,
      id: user._id
    });
  });
};

exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "USER email does not exists"
      });
    }

    if (!user.autheticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match"
      });
    }

    //create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    //put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    //send response to front end
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User signout successfully"
  });
};

// // Example

// // Not Signedin - Only view profile pic of friend account

// // isSignedin - Fb loggedin, to check email, while clicking About Section

// // isAutenticated - Need to change profile pic of his own, need to authenticate


//protected routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth"
});

//custom middlewares
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "Authenticate Access Denied"
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "You are not ADMIN, Access denied"
    });
  }
  next();
};
