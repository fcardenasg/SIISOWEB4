/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  corePlugins: {
    // Deshabilitado para no interferir con los estilos existentes de MUI y SCSS
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        'brand-start': '#1a1819',
        'brand-dark':  '#0d0c0e',
        'brand-red':   '#E31937',
      },
    },
  },
  plugins: [],
}


