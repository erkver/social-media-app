UPDATE users
SET username = $2, pic = $3
WHERE id = $1
RETURNING *;
