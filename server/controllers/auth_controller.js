const bcrypt = require('bcryptjs');

module.exports = {
  register: async (req, res) => {
    try {
      const db = req.app.get('db');
      const { username, pic } = req.body;
      const result = await db.user.login_user(username);
      const exisitingUser = result[0];
      if (exisitingUser) {
        return res.status(409).json('Username taken');
      }
      const password = await bcrypt.hash(req.body.password, 12);
      const newUser = await db.user.register_user([username, password, pic]);
      const user = newUser[0];
      req.session.user = {
        id: user.id,
        username,
        pic
      };
      res.status(200).json(req.session.user);
    } catch (err) {
      console.log(err);
      res.status(401).json('Register failed');
    }
  },
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const result = await req.app.get('db').user.login_user(username);
      if (!result[0]) {
        return res.status(500).json('Please register');
      }
      const isAuthed = await bcrypt.compare(password, result[0].password);
      if (!isAuthed) {
        return res.status(500).json('Wrong Password');
      }
      req.session.user = {
        id: result[0].id,
        username: result[0].username,
        pic: result[0].pic
      };
      res.status(200).json(req.session.user);
    } catch (err) {
      console.log(err);
      res.status(500).json('Login failed');
    }
  },
  getUser: (req, res) => {
    res.status(200).json(req.session.user);
  },
  logout: (req, res) => {
    req.session.destroy();
    res.status(200).json(req.session);
  }
};
