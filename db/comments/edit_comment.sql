UPDATE comments
SET text = $2
WHERE comment_id = $1
RETURNING *;