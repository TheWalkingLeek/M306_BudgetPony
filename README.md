# M306 BudgetPony

This is a repo for our school project.

We're creating a budget management app where you can track your expenses and income.

The app uses VueJS as frontend and nodejs express as backend. The Database is PostgreSQL

## Setup

### Frontend

- `cd frontend`
- `npm install`
- `npm run serve`

### Backend

- `cd backend`
- `npm install`
- `npm start`

### Database

- `cd backend/db`
- `docker-compose up -d`
- `cd ..`
- `npm run db-init`
