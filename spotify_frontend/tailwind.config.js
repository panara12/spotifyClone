/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    theme: {
      screens: {
        'sm': '540px',
        // => @media (min-width: 640px) { ... }
  
        'md': '768px',
        // => @media (min-width: 768px) { ... }
  
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
  
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      }
    },
    extend: {
      backgroundColor: {
        "app-green": "rgb(0,255,100)",
        "app-black":"#121212"
      },
      height:{
        "1/10":"9%",
        "9/10":"91%",
        "card":"284px"
      },
      width:{
        "card":"203px",
        "9/10":"91%"
      },
      boxShadow:{
        "my":"1px 5px 10px black;"
      }
    },
  },
  plugins: [],
}