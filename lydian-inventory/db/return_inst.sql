UPDATE inst_status
SET return_date = $1
WHERE status_id = $2;