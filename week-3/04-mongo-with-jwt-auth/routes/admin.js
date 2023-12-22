const { Router } = require("express");
const authenticateJWT = require("../middleware/authenticateJWT");
const router = Router();

// Admin Routes
router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const checkUser = await Admin.findOne({ username });

  if (checkUser) {
    res.status(404).send("User already exist");
  }
  Admin.create({
    username: username,
    password: password,
  });
  res.json({
    msg: "User Created successfully",
  });
});

router.post("/signin", (req, res) => {
  let username = req.headers.username;
  let password = req.headers.password;

  try {
    const user = Admin.findOne({ username }).then((result) => {
      result.json();
    });

    if (password === user.password) {
      console.log("Login Successful");
      const user = { username: username };
      const accessToken = jwt.sign(user, secretKey);
      res
        .header("Authorization", `Bearer ${accessToken}`)
        .json({ message: "Login successful", accessToken });
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/courses", authenticateJWT, (req, res) => {
  Course.create({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image,
    courseId: req.body.courseId,
  });
});

router.get("/courses", authenticateJWT, (req, res) => {
  Course.find().then((courses) => {
    res.json(courses);
  });
});

module.exports = router;
