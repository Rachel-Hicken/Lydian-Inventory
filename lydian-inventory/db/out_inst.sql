select i.inst_id, i.inst_school_id, i.inst_type, i.serial_num, 
s.student_id, s.student_first, s.student_last, a.checkout_date, a.due_date, a.return_date
from instruments i
join inst_status a on i.inst_id = a.inst_id
join students s on s.student_id = a.student_id
where return_date ISNULL;