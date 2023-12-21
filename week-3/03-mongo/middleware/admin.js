// Middleware for handling auth
function adminMiddleware(req, res, next) {
  let username = req.headers.username;
  let password = req.headers.password;

  try {
    const user = Admin.findOne({ username }).then((result) => {
      result.json();
    });

    if (password === user.password) {
      res.json({ message: "Login successful" });
      next();
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = adminMiddleware;
