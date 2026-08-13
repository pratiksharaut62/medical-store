import type { Config } from "tailwindcss";

// Every value here is pulled directly from the design system doc
// (Sections 4, 5, 40, 41) — do not invent new colors/spacing ad hoc.
// Add new tokens here first, then consume via Tailwind classes.
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1677FF",
          dark: "#0F5ED7",
          soft: "#EAF3FF",
        },
        header: {
          DEFAULT: "#071A33",
          secondary: "#0D2442",
          text: "#FFFFFF",
          muted: "#AEBBD0",
        },
        success: "#22A447",
        warning: "#F59E0B",
        danger: "#E5484D",
        accent: "#7C4DFF",
        bg: "#F8FAFC",
        surface: "#FFFFFF",
        border: "#E5EAF0",
        text: {
          primary: "#172033",
          secondary: "#667085",
          disabled: "#98A2B3",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
      },
      fontSize: {
        "page-title": ["26px", { lineHeight: "32px", fontWeight: "600" }],
        "section-title": ["17px", { lineHeight: "24px", fontWeight: "600" }],
        "card-title": ["14px", { lineHeight: "20px", fontWeight: "600" }],
        "metric-value": ["26px", { lineHeight: "32px", fontWeight: "600" }],
        body: ["14px", { lineHeight: "20px", fontWeight: "400" }],
        caption: ["12.5px", { lineHeight: "18px", fontWeight: "400" }],
        badge: ["11.5px", { lineHeight: "16px", fontWeight: "500" }],
      },
      spacing: {
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        6: "24px",
        8: "32px",
        10: "40px",
        12: "48px",
      },
      borderRadius: {
        sm: "8px",
        md: "10px",
        lg: "12px",
        xl: "16px",
        pill: "999px",
      },
      boxShadow: {
        card: "0 1px 2px 0 rgba(23, 32, 51, 0.04)",
        popover: "0 4px 16px 0 rgba(23, 32, 51, 0.10)",
      },
    },
  },
  plugins: [],
} satisfies Config;
