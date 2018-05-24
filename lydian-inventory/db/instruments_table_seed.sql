CREATE TABLE IF NOT EXISTS instruments
(
	inst_id SERIAL PRIMARY KEY,
	inst_school_id VARCHAR(50),
	inst_type VARCHAR(75) NOT NULL,
	serial_num VARCHAR(50) NOT NULL,
	make VARCHAR(50),
	model VARCHAR(50),
	year INTEGER,
	purchase_price decimal NOT NULL
);
