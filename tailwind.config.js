/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        md: "760px",
      },
      fontFamily: {
        sans: ["system-ui", "-apple-system", '"Segoe UI"', "Roboto", "sans-serif"],
      },
      colors: {
        "brand-navy": "#0a1f44",
        "brand-navy-light": "#12305e",
        "brand-blue": "#1e6fd9",
        "brand-green": "#2fb344",
        "brand-green-light": "#e8f8ea",
        "brand-bg-soft": "#f5f8fc",
        "brand-text": "#14213d",
        "brand-text-soft": "#4b5b76",
        "brand-border": "#e3e9f2",
        "on-green": "#08240f",
        "on-whatsapp": "#0b2e13",
      },
    },
  },
  plugins: [],
};
