@echo off
echo Starting MNP Project components...

:: First window - mnpproject with pnpm
start powershell.exe -NoExit -Command "cd ./mnpproject; if (Get-Command pnpm -ErrorAction SilentlyContinue) { Write-Host 'pnpm is installed, proceeding with installation and startup' -ForegroundColor Green; npm i; npm run dev} else { Write-Host 'pnpm is not installed. Please install pnpm first.' -ForegroundColor Red }"

:: Second window - MNPCore with npm i and npm run dev
start powershell.exe -NoExit -Command "cd ./MNPCore; npm i; npm run dev"

:: Third window - MNPCore with npm run dev:server
start powershell.exe -NoExit -Command "cd ./MNPCore; npm run dev:server"

echo All processes started. Waiting for 1 minute before opening browser...

:: Wait for 1 minute
timeout /t 60 /nobreak > nul

:: Open default browser to localhost:3000
start http://localhost:3000

echo Browser opened to localhost:3000