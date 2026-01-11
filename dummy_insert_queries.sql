-- 10 Dummy INSERT queries for Employee table
-- Table name: employee
-- Note: 'id' field is auto-generated, so it's not included in INSERT statements
-- Note: 'reporting_to' field stores employee IDs (e.g., 'EMP001') not employee names

INSERT INTO employee (employee_id, full_name, email_id, phone_no, base_location, reporting_to, gender, total_experience, primary_skills, secondary_skills, is_active, is_employee_on_notice, ctc)
VALUES ('EMP001', 'John Smith', 'john.smith@xebia.com', '+91-9876543210', 'Bangalore', NULL, 'Male', 5, 'Java, Spring Boot, Microservices', 'Docker, Kubernetes', true, false, '12 LPA');

INSERT INTO employee (employee_id, full_name, email_id, phone_no, base_location, reporting_to, gender, total_experience, primary_skills, secondary_skills, is_active, is_employee_on_notice, ctc)
VALUES ('EMP002', 'Priya Sharma', 'priya.sharma@xebia.com', '+91-9876543211', 'Delhi', 'EMP001', 'Female', 3, 'React, JavaScript, TypeScript', 'Node.js, MongoDB', true, false, '8 LPA');

INSERT INTO employee (employee_id, full_name, email_id, phone_no, base_location, reporting_to, gender, total_experience, primary_skills, secondary_skills, is_active, is_employee_on_notice, ctc)
VALUES ('EMP003', 'Michael Chen', 'michael.chen@xebia.com', '+91-9876543212', 'Pune', 'EMP001', 'Male', 7, 'Python, Django, Machine Learning', 'TensorFlow, AWS', true, true, '18 LPA');

INSERT INTO employee (employee_id, full_name, email_id, phone_no, base_location, reporting_to, gender, total_experience, primary_skills, secondary_skills, is_active, is_employee_on_notice, ctc)
VALUES ('EMP004', 'Ananya Reddy', 'ananya.reddy@xebia.com', '+91-9876543213', 'Hyderabad', 'EMP002', 'Female', 4, 'Angular, TypeScript, RxJS', 'Firebase, GraphQL', true, false, '10 LPA');

INSERT INTO employee (employee_id, full_name, email_id, phone_no, base_location, reporting_to, gender, total_experience, primary_skills, secondary_skills, is_active, is_employee_on_notice, ctc)
VALUES ('EMP005', 'Rahul Verma', 'rahul.verma@xebia.com', '+91-9876543214', 'Bangalore', 'EMP001', 'Male', 2, 'Java, Hibernate, MySQL', 'Git, Jenkins', true, false, '6 LPA');

INSERT INTO employee (employee_id, full_name, email_id, phone_no, base_location, reporting_to, gender, total_experience, primary_skills, secondary_skills, is_active, is_employee_on_notice, ctc)
VALUES ('EMP006', 'Sneha Patel', 'sneha.patel@xebia.com', '+91-9876543215', 'Mumbai', 'EMP002', 'Female', 6, 'DevOps, CI/CD, Jenkins', 'AWS, Terraform, Ansible', true, true, '15 LPA');

INSERT INTO employee (employee_id, full_name, email_id, phone_no, base_location, reporting_to, gender, total_experience, primary_skills, secondary_skills, is_active, is_employee_on_notice, ctc)
VALUES ('EMP007', 'Amit Kumar', 'amit.kumar@xebia.com', '+91-9876543216', 'Gurgaon', 'EMP004', 'Male', 4, 'React Native, Mobile Development', 'Redux, Firebase', true, false, '9 LPA');

INSERT INTO employee (employee_id, full_name, email_id, phone_no, base_location, reporting_to, gender, total_experience, primary_skills, secondary_skills, is_active, is_employee_on_notice, ctc)
VALUES ('EMP008', 'Deepika Nair', 'deepika.nair@xebia.com', '+91-9876543217', 'Chennai', 'EMP002', 'Female', 5, 'Full Stack Development, Node.js', 'PostgreSQL, Redis', true, false, '11 LPA');

INSERT INTO employee (employee_id, full_name, email_id, phone_no, base_location, reporting_to, gender, total_experience, primary_skills, secondary_skills, is_active, is_employee_on_notice, ctc)
VALUES ('EMP009', 'Vikram Joshi', 'vikram.joshi@xebia.com', '+91-9876543218', 'Pune', 'EMP003', 'Male', 8, 'Scala, Apache Spark, Big Data', 'Kafka, Hadoop', true, true, '20 LPA');

INSERT INTO employee (employee_id, full_name, email_id, phone_no, base_location, reporting_to, gender, total_experience, primary_skills, secondary_skills, is_active, is_employee_on_notice, ctc)
VALUES ('EMP010', 'Kavita Singh', 'kavita.singh@xebia.com', '+91-9876543219', 'Bangalore', 'EMP002', 'Female', 3, 'Vue.js, JavaScript, CSS', 'Webpack, SASS', true, false, '7 LPA');
