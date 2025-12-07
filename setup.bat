@echo off
setlocal enabledelayedexpansion

echo.
echo 🚀 Bat dau cai dat ung dung Fakebook...
echo.

REM Kiem tra Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo ❌ Node.js khong duoc cai dat. Vui long cai dat Node.js truoc.
    echo.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i

echo ✅ Node.js: %NODE_VERSION%
echo ✅ npm: %NPM_VERSION%
echo.

REM Cai dat dependencies cho API
echo 📦 Cai dat dependencies cho API...
cd api
call npm install
if %errorlevel% neq 0 (
    echo.
    echo ❌ Loi cai dat API dependencies
    echo.
    pause
    exit /b 1
)

REM Cai dat dependencies cho Client
echo.
echo 📦 Cai dat dependencies cho Client...
cd ..\client
call npm install
if %errorlevel% neq 0 (
    echo.
    echo ❌ Loi cai dat Client dependencies
    echo.
    pause
    exit /b 1
)

echo.
echo ✅ Cai dat hoan tat!
echo.
echo 📝 Huong dan tiep theo:
echo 1. Chac chan MySQL Server dang chay
echo 2. Tao database theo huong dan trong SETUP.md
echo 3. Mo Terminal trong thu muc goc va chay: npm run dev
echo.
echo 🌐 Ung dung se chay tai:
echo    - API: http://localhost:8800
echo    - Client: http://localhost:3000
echo.
pause
