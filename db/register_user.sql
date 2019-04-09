INSERT INTO users
  (username, password, pic)
VALUES($1, $2, $3)
RETURNING *;