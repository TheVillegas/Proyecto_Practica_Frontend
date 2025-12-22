/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    corePlugins: {
        preflight: false,
    },
    theme: {
        extend: {
            colors: {
                "ion-primary": "#006EB6",
                "ion-primary-dark": "#005a96",
                "ion-azul-oscuro": "#29588C",
                "ion-light": "#F4F4F4",
                "text-main": "#1e293b",
                "text-muted": "#64748b",
                "surface": "#ffffff",
            },
            fontFamily: {
                "display": ["Inter", "sans-serif"]
            },
            boxShadow: {
                'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                'input': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            }
        },
    },
    plugins: [],
}
