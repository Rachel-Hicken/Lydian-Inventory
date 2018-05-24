UPDATE instruments 
SET inst_school_id = $1,
inst_type = $2,
serial_num = $3,
make = $4,
model = $5,
inst_year = $6,
purchase_price = $7
WHERE inst_id = $8;