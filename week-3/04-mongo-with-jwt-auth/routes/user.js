const { Router } = require("express");
const authenticateJWT = require("../middleware/authenticateJWT");
const router = Router();

// User Routes
router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const checkUser = await User.findOne({ username });

  if (checkUser) {
    res.status(404).send("User already exist");
  }
  User.create({
    username: username,
    password: password,
  });
  res.json({
    msg: "User Created successfully",
  });
});

router.post("/login", (req, res) => {
  let username = req.headers.username;
  let password = req.headers.password;

  try {
    const user = User.findOne({ username }).then((result) => {
      result.json();
    });

    if (password === user.password) {
      console.log("Login Successful");
      const user = { username: username };
      const accessToken = jwt.sign(user, secretKey);
      res
        .header("Authorization", `Bearer ${accessToken}`)
        .header({username})
        .json({ message: "Login successful", accessToken });
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/courses", (req, res) => {
  Course.find().then((courses) => {
    res.json(courses);
  });
});

router.post("/courses/:courseId", authenticateJWT, async (req, res) => {
  const username = req.body.username;
  const courseId = req.params.courseId;
  Course.find({ courseId }).then((result) => {
    Transaction.create({
      username: username,
      course: result[0].title,
    });
  });
});

router.get("/purchasedCourses", authenticateJWT, async (req, res) => {
  const username = req.headers.username;
  const purchasedCourse = await Transaction.find({ username });
  console.log(purchasedCourse);
});

module.exports = router