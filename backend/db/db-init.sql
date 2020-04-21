CREATE TABLE "user" (
  id SERIAL PRIMARY KEY,
  email varchar(50),
  password varchar(50),
  salaryDay int
);

CREATE TABLE "category" (
  id SERIAL PRIMARY KEY,
  userId int NOT NULL REFERENCES "user"(id),
  name varchar(50),
  budget int
);

CREATE TABLE "transaction" (
  id SERIAL PRIMARY KEY,
  categoryId int NOT NULL REFERENCES "category"(id),
  description varchar(50),
  amount int,
  createdAt date
);
