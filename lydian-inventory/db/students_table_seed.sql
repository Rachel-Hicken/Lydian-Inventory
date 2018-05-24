CREATE TABLE IF NOT EXISTS students
(
	student_id SERIAL PRIMARY KEY,
	student_school_id VARCHAR(40),
	student_first VARCHAR(40) NOT NULL,
	student_last VARCHAR(40) NOT NULL,
	student_email VARCHAR(100) NOT NULL,
	student_phone VARCHAR(10) NOT NULL,
	student_address VARCHAR(100) NOT NULL,
	student_city VARCHAR(50) NOT NULL,
	student_state VARCHAR(50) NOT NULL,
	student_zip INTEGER
);