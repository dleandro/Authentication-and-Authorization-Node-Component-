module.exports = {
  devServer: {
    proxy: {
      '/api': `http://localhost:${process.env.PORT}`
    }
  }
}
