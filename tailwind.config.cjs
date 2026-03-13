/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"] ,
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0B0D0F",
          900: "#111317",
          800: "#1B1F24",
          700: "#2A3038",
          200: "#D3D7DD",
          100: "#ECEFF3"
        },
        steel: {
          500: "#3C6E8F",
          400: "#4E8FB5",
          300: "#6FB4DB"
        },
        ember: {
          500: "#F97316",
          400: "#FDBA74"
        },
        sun: {
          500: "#FACC15",
          400: "#FDE047"
        },
        aqua: {
          500: "#22D3EE",
          400: "#67E8F9"
        },
        lime: {
          500: "#9AEF6C"
        }
      },
      fontFamily: {
        display: ["'Sora'", "system-ui", "sans-serif"],
        mono: ["'IBM Plex Mono'", "ui-monospace", "SFMono-Regular", "monospace"]
      },
      boxShadow: {
        card: "0 20px 50px -30px rgba(15, 23, 42, 0.6)"
      },
      backgroundImage: {
        "mesh": "radial-gradient(circle at 20% 20%, rgba(111, 180, 219, 0.18), transparent 45%), radial-gradient(circle at 80% 0%, rgba(249, 115, 22, 0.2), transparent 40%), radial-gradient(circle at 60% 80%, rgba(154, 239, 108, 0.16), transparent 45%)"
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" }
        },
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0px)" }
        }
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        fadeIn: "fadeIn 0.6s ease-out forwards"
      }
    }
  },
  plugins: []
};
