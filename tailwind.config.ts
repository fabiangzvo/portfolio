import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        text: "var(--text)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        tertiary: "var(--tertiary)",
        paragraph: "var(--paragraph)",
        buttonText: "var(--buttonText)",
        stroke: "var(--stroke)",
        highlight: "var(--highlight)",
        desktop: "var(--desktop)",
      },
      keyframes: {
        translateToRight: {
          from: {
            transform: "translateX(0px)",
          },
          to: {
            transform: "translateX(-20px)",
          },
        },
        typing: {
          from: { width: "0" },
          "50%": { width: "8ch" },
          to: { width: "0" },
        },
        blink: {
          "50%": { borderColor: "transparent" },
        },
      },
      animation: {
        translateToRight: "translateToRight 2s ease-in-out infinite",
        typewriter:
          "typing 4s steps(10) infinite, blink .5s infinite step-end alternate-reverse",
      },
      fontFamily: {
        albertSans: ["var(--albert-sans)"],
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
export default config;
