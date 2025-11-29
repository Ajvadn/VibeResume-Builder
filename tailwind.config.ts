import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-outfit)", "sans-serif"], // Default
                inter: ["var(--font-inter)", "sans-serif"],
                roboto: ["var(--font-roboto)", "sans-serif"],
                "open-sans": ["var(--font-open-sans)", "sans-serif"],
                lato: ["var(--font-lato)", "sans-serif"],
                montserrat: ["var(--font-montserrat)", "sans-serif"],
                playfair: ["var(--font-playfair)", "serif"],
                merriweather: ["var(--font-merriweather)", "serif"],
                lora: ["var(--font-lora)", "serif"],
                "roboto-mono": ["var(--font-roboto-mono)", "monospace"],
                "fira-code": ["var(--font-fira-code)", "monospace"],
            },
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: "var(--primary)",
                "primary-hover": "var(--primary-hover)",
                secondary: "var(--secondary)",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
export default config;
