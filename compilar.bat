@echo off
echo Compilando Tailwind...
.\tailwindcss.exe -i ./css/input.css -o ./css/tailwind.css --minify
echo.
echo Listo. Presiona una tecla para salir.
pause >nul