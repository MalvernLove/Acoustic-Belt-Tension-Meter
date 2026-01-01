@echo off

cd %~dp0
python -m http.server 8000
start http://localhost:8000