UPDATE posts
SET text = $2
WHERE post_id = $1
RETURNING *;