module.exports = {
    content: [
        './index.html',
        './src/**/*.{js,jsx,ts,tsx}', // Include your Vite project source files
      ],
      theme: {
        extend: {
            colors: {
                vuejs: "#49e659"
            }
        },
      },
      plugins: []
}