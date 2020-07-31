module.exports = {
  devServer: {
    proxy: {
      '/api': `http://localhost:${process.env.WEB_API_PORT || 8080}`
    }
  }
}

//set REACT_APP_WEB_API_PORT=8080&&set REACT_APP_WEB_APP_PORT=3000 && 
