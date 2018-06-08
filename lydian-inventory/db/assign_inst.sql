INSERT INTO inst_status
(inst_id, student_id, checkout_date, due_date, return_date, fee)
VALUES
($1, $2, $3, $4, $5, $6);