module.exports = {
  getComments: async (req, res) => {
    try {
      const result = await req.app
        .get('db')
        .comments.get_comments(req.params.id);
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json('Get comments failed');
    }
  },
  getComment: async (req, res) => {
    try {
      const result = await req.app
        .get('db')
        .comments.get_comment(req.params.id);
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json('Get comment failed');
    }
  },
  addComment: async (req, res) => {
    try {
      const result = await req.app
        .get('db')
        .comments.add_comment([
          req.body.text,
          req.body.postId,
          req.body.userId
        ]);
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json('Add comment failed');
    }
  },
  editComment: async (req, res) => {
    try {
      const result = await req.app
        .get('db')
        .comments.edit_comment([req.params.id, req.body.text]);
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json('Edit post failed');
    }
  },
  deleteComment: async (req, res) => {
    try {
      const result = await req.app
        .get('db')
        .comments.delete_comment(req.params.id);
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json('Delete comment failed');
    }
  }
};
