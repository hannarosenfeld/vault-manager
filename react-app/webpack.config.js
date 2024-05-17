// webpack.config.js
console.log("🤪")
module.exports = {
    // Other configurations...
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:5000',
          changeOrigin: true,
        },
      },
    },
  };
  