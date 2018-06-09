UPDATE inst_status
SET paid_date = CURRENT_TIMESTAMP
WHERE status_id = $1
RETURNING *;