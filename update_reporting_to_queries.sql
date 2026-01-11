-- UPDATE queries to change reporting_to from employee names to employee IDs
-- Table name: employee

-- EMP001 (John Smith) - Top level manager, no reporting manager
UPDATE employee SET reporting_to = NULL WHERE employee_id = 'EMP001';

-- EMP002 (Priya Sharma) - Reports to EMP001
UPDATE employee SET reporting_to = 'EMP001' WHERE employee_id = 'EMP002';

-- EMP003 (Michael Chen) - Reports to EMP001
UPDATE employee SET reporting_to = 'EMP001' WHERE employee_id = 'EMP003';

-- EMP004 (Ananya Reddy) - Reports to EMP002
UPDATE employee SET reporting_to = 'EMP002' WHERE employee_id = 'EMP004';

-- EMP005 (Rahul Verma) - Reports to EMP001
UPDATE employee SET reporting_to = 'EMP001' WHERE employee_id = 'EMP005';

-- EMP006 (Sneha Patel) - Reports to EMP002
UPDATE employee SET reporting_to = 'EMP002' WHERE employee_id = 'EMP006';

-- EMP007 (Amit Kumar) - Reports to EMP004
UPDATE employee SET reporting_to = 'EMP004' WHERE employee_id = 'EMP007';

-- EMP008 (Deepika Nair) - Reports to EMP002
UPDATE employee SET reporting_to = 'EMP002' WHERE employee_id = 'EMP008';

-- EMP009 (Vikram Joshi) - Reports to EMP003
UPDATE employee SET reporting_to = 'EMP003' WHERE employee_id = 'EMP009';

-- EMP010 (Kavita Singh) - Reports to EMP002
UPDATE employee SET reporting_to = 'EMP002' WHERE employee_id = 'EMP010';
