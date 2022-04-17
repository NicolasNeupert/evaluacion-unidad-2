CREATE TABLE free_users (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	first_name VARCHAR(90) NOT NULL,
	last_name VARCHAR(90) NOT NULL,
	email VARCHAR(255) NOT NULL
);

CREATE TABLE post (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	title_post VARCHAR(255) NOT NULL,
	content_post TEXT,
	created_at_post TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	user_id INT,
	KEY user_id_idx(user_id)
);

INSERT INTO free_users (first_name, last_name, email) VALUES (
	"Nicolas", "Neupert", "nicolas.neupert.juan@ciisa.cl"
);