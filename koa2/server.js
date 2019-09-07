const koa = require('koa')
const logger = require('./koa-logger')
const Router = require('koa-router')

const app = new koa()
const router = new Router()

app.use(async(ctx, next) => {
  // console.log(ctx)
  ctx.body = 'hello koa2'
  next()
})

router.get('/', async(ctx, next) => {
  ctx.body = '这是一个首页'
})

router.get('/list', async(ctx, next) => {
  ctx.body = '这是一个列表'
})

app.use(logger)
app.use(router.routes())
   .use(router.allowedMethods())

app.listen(3003, () => {
  console.log('http://localhost:3003')
})
