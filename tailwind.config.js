const plugin = require('tailwindcss/plugin');

module.exports = {
    content: [
        "./src/**/*/.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: { richblack: '#010101', }
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
