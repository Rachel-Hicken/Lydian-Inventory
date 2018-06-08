UPDATE inst_status
SET paid_date = NOW()
WHERE status_id = $1;