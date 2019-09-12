const path = require('path')
const Koa = require('koa')
const serve = require('koa-static')

const PORT = process.env.PORT || 4000
const HOST = process.env.HOST || '127.0.0.1'
const app = new Koa()

app.use(serve(path.resolve(__dirname, './build')))

app.listen(PORT, HOST, () => {
  console.log(`App listen on http://${HOST}:${PORT}`)
})
