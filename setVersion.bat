@echo off
cd /d %~dp0

call npx --no-install gulp version --newversion=4.3.1
