UPDATE users
SET pic = $2
WHERE id = $1
RETURNING *;