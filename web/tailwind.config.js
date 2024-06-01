/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './src/**/*.html',
        './src/**/*.tsx',
    ],
    theme: {
        extend: {
            screens: {
                'sm': '0px',
                'md': '1440px',
                'lg': '1920px',
            },
            backgroundColor: {
                'primary': '#001529',
            },
            textColor: {
                'primary': '#1677ff',
            },
        },
    },
    plugins: [],
}

