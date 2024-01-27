/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                blog: "#3B3F44",
                blog2: "#FAFAFA",
            }
        },
    },
    corePlugins: {
        listStyleType: true,
        listDecimal: true,
    },
    plugins: [require('daisyui'), require('@tailwindcss/typography')],
    daisyui: {
        // themes: [],
        themes: ['winter', 'night'],

    },
}

