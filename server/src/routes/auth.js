import Router from '@koa/router'
import admin from '#firebase/firebase.js'

const router = new Router()

router.post('/auth', async (ctx) => {
  // @ts-ignore
  const { token } = ctx.request.body

  try {
    const decodedToken = await admin.auth().verifyIdToken(token)
    // Token verification successful, create your own logic here
    ctx.body = { message: 'Auth Test token', success: true, decodedToken }
  } catch (error) {
    ctx.status = 401
    ctx.body = { success: false, message: error }
  }
})

export default router
