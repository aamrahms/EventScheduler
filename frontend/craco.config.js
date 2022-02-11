// craco.config.js
module.exports = {
    style: {
      postcss: {
        plugins: [
          // require('postcss-import'),
          require('tailwindcss'),
          require('autoprefixer'),
        ],
      },
    },
}