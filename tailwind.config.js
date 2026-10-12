/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './js/**/*.js'],
    theme: {
        extend: {
            colors: {
                blanco: '#FFFFFF',
                humo: '#1A1A1A',
                esmeralda: '#2ECC71',
                grisclaro: '#F4F6F7',
                gristexto: '#555555'
            },
            fontFamily: {
                sans: ['"Plus Jakarta Sans"', 'sans-serif'],
                mono: ['"Plus Jakarta Sans"', 'sans-serif']
            }
        }
    },
    plugins: []
};