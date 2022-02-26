module.exports = {
    style: {
      postcss: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer'),
        ],
      },
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  }
