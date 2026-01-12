/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Elite Beauty & Clinic Palette
        beauty: {
          primary: "#D4A373", // Warm Bronzed Gold
          secondary: "#FAEDE3", // Champagne Cream
          accent: "#A57164", // Deep Rose Terra
          dark: "#1A1A1A", // Absolute Black/Onyx
          charcoal: "#2D2D2D", // Rich Grey
          light: "#FFFFFF", // Pure White
          rose: "#F8E1E7", // Ultra soft petal
        },
        luxury: {
          gold: "#C5A059",
          cream: "#FAF9F6",
          emerald: "#143023",
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-heading)", "Playfair Display", "serif"],
      },
      animation: {
        "fade-in": "fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-up": "slideUp 1s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-down": "slideDown 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        "reveal-left": "revealLeft 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
        "scale-in": "scaleIn 1s cubic-bezier(0.16, 1, 0.3, 1)",
        float: "float 4s ease-in-out infinite",
        "pulse-gold": "pulseGold 3s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(40px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-40px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        revealLeft: {
          "0%": { clipPath: "inset(0 100% 0 0)" },
          "100%": { clipPath: "inset(0 0 0 0)" },
        },
        scaleIn: {
          "0%": { transform: "scale(1.1)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseGold: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.5" },
          "50%": { transform: "scale(1.1)", opacity: "0.2" },
        },
      },
      backgroundImage: {
        "gradient-premium": "linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%)",
        "gradient-soft": "linear-gradient(135deg, #FAEDE3 0%, #FFFFFF 100%)",
        "gradient-rose-gold": "linear-gradient(135deg, #D4A373 0%, #A57164 100%)",
        "gradient-rose": "linear-gradient(135deg, #F8E1E7 0%, #A57164 100%)",
        "gradient-gold": "linear-gradient(135deg, #D4A373 0%, #C5A059 100%)",
        "gradient-beauty": "linear-gradient(135deg, #FAEDE3 0%, #D4A373 100%)",
        "gradient-overlay": "linear-gradient(to bottom, transparent 0%, rgba(26,26,26,0.8) 100%)",
      },
      boxShadow: {
        premium: "0 20px 50px -12px rgba(0, 0, 0, 0.1)",
        "premium-hover": "0 30px 60px -12px rgba(0, 0, 0, 0.2)",
        gold: "0 10px 30px -10px rgba(212, 163, 115, 0.3)",
      },
    },
  },
  plugins: [],
};
