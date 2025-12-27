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
                "brand-header": "#29588C",
                "brand-primary": "#006EB6",
                "brand-danger": "#C41D1D",
                "brand-bg": "#F4F4F4",
                "brand": {
                    "header": "#29588C",
                    "bg": "#F4F4F4",
                    "primary": "#006EB6",
                    "danger": "#C41D1D",
                },
                "primary": "#0064a7",
                "secondary": "#c9252c",
                "background-light": "#f4f6f8",
                "background-dark": "#1a202c",
                "surface-light": "#ffffff",
                "surface-dark": "#2d3748",
                "text-light": "#1f2937",
                "text-dark": "#f3f4f6",
                "label-light": "#1e3a8a",
                "label-dark": "#93c5fd",
                "border-light": "#e5e7eb",
                "border-dark": "#4b5563",
            },
            fontFamily: {
                "display": ["Inter", "sans-serif"]
            },
            boxShadow: {
                'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                'input': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.02)',
            }
        },
    },
    plugins: [],
}
