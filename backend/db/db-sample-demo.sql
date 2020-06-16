INSERT INTO "user" (email, password, salaryDay) VALUES
('demo2@test.com', '123456', 28);

INSERT INTO "category" (userId, name, budget) VALUES
(1, 'Essen', null),
(1, 'Sparen', null);

INSERT INTO "transaction" (categoryId, description, amount, createdAt) VALUES
(1, 'Essensgeld', 50.00,'2020-06-05'),
(1, 'Burger', -13.00,'2020-06-06'),
(1, 'Nachtessen', -21.00,'2020-06-11'),
(1, 'Essensgeld', 40.00,'2020-06-19'),
(2, 'Sackgeld', 20.00,'2020-06-08'),
(2, 'Sackgeld', 20.00,'2020-06-15'),
(2, 'Sackgeld', 20.00,'2020-06-22'),
(2, 'Uhr', -55.00,'2020-06-24');