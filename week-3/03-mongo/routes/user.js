const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { Course, Transaction } = require("../db");

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

router.get("/courses", (req, res) => {
  Course.find().then((courses) => {
    res.json(courses);
  });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  const username = req.headers.username;
  const courseId = req.params.courseId;
  Course.find({ courseId }).then((result) => {
    Transaction.create({
      username: username,
      course: result[0].title,
    });
  });
});

router.get("/purchasedCourses", userMiddleware, async(req, res) => {
  const username = req.headers.username;
  const purchasedCourse = await Transaction.find({ username })
  console.log(purchasedCourse)
});

module.exports = router