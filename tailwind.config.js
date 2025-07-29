const plugin = require('tailwindcss/plugin');

module.exports = {
    content: [
        "./src/**/*/.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                richblack: '#010101',
                primary: '#1a202c', /* Un color de fondo oscuro */
                secondary: '#2d3748', /* Un color secundario oscuro */
                accent: '#4a5568', /* Un color de acento oscuro */
                text: '#e2e8f0', /* Un color de texto claro para contraste */
                'text-light': '#cbd5e0', /* Un color de texto ligeramente más claro */
            }
        },
        
    },
    plugins: [
        require('daisyui'),
        plugin(function({ addUtilities}) {
            addUtilities({
                '.text-shadow': {
                    textShadow: '2px 2px 4px rgba(0,0, 0, 0.4,)',
                }
            })
        })
    ]
 }
