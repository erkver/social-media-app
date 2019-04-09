module.exports = {
  updateUser: async (req, res) => {
    try {
      const db = req.app.get('db');
      const { username, pic } = req.body;
      const { id } = req.params;
      if (req.session.user.username === username) {
        const picResult = await db.update_pic([id, pic]);
        req.session.user.pic = picResult[0].pic;
        return res.status(200).json(req.session.user);
      } else if (req.session.user.pic === pic) {
        const usernameCheck = await db.login_user(username);
        if (usernameCheck[0]) {
          return res.status(500).json('Username is already taken');
        }
        const usernameResult = await db.update_username([id, username]);
        req.session.user.username = usernameResult[0].username;
        res.status(200).json(req.session.user);
      } else {
        const result = await db.update_user([id, username, pic]);
        const user = result[0];
        req.session.user = {
          id: user.id,
          username: user.username,
          pic: user.pic
        };
        res.status(200).json(req.session.user);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json('User info update failed');
    }
  }
};
