module.exports = {
  devServer: {
    proxy: {
      '/api': `http://localhost:${process.env.WEB_API_PORT || 8080}`
    }
  }
}
