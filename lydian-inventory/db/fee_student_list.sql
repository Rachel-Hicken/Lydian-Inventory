select a.status_id, i.inst_school_id, a.checkout_date, a.return_date, a.fee,
case when a.paid_date ISNULL then 'UNPAID' else 'PAID' end as Status 
from instruments i
inner join inst_status a
on i.inst_id = a.inst_id
where student_id = 1