@echo off
docker.exe exec -it budget_pony_db psql -d budget_pony_dev -U pony -p 5432
pause