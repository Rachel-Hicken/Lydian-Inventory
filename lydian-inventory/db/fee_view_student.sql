select student_school_id, student_first, student_last, student_phone, student_email
from students
where student_id = $1;