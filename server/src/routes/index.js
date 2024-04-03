import Router from '@koa/router'

const router = new Router()

// Test root endpoint
router.get('/', async (ctx) => {
  ctx.body = { name: 'John Doe' }
})

export default router
