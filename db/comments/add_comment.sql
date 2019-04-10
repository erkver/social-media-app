INSERT INTO comments
  (text, postId, userId)
VALUES
  ($1, $2, $3)
RETURNING *;