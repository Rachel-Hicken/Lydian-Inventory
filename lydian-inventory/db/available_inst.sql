SELECT 
inst_id
,inst_school_id
,serial_num
,inst_type
,Case when checkout_count = return_count then 'Available' else 'Not Available' end as Status 
FROM 
(SELECT  
 i.inst_id
,inst_school_id
,serial_num
,inst_type
,Count(checkout_date) as checkout_count
,Count(return_date) as return_count

FROM instruments i 
         LEFT JOIN inst_status a on a.inst_id = i.inst_id 
		 Group by i.inst_id, inst_school_id,serial_num,inst_type) as temp