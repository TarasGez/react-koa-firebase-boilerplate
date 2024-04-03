import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import json from 'koa-json'
import dotenv from 'dotenv'

// Routes
import tagsRouter from '#routes/tags.js'
import indexRouter from '#routes/index.js'
import authTestRouter from '#routes/auth.js'

// Load environment variables
dotenv.config()

const app = new Koa()

// Use middleware
app.use(async (ctx, next) => {
  await cors()(ctx, next)
})
app.use(async (ctx, next) => {
  await json()(ctx, next)
})
app.use(async (ctx, next) => {
  await logger()(ctx, next)
})
app.use(async (ctx, next) => {
  await bodyParser()(ctx, next)
})

// Combine routers
app.use(tagsRouter.routes())
app.use(indexRouter.routes())
app.use(authTestRouter.routes())

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`  ➜ 🚀 Koa server is running on port http://localhost:${port}/`)
})
