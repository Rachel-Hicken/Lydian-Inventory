UPDATE students
SET student_school_id = $1,
student_first = $2,
student_last = $3,
student_email = $4,
student_phone = $5,
student_address = $6,
student_city = $7,
student_state = $8,
student_zip = $9,
WHERE inst_id = $10;