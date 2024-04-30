import Router from '@koa/router'
import firebaseAdmin, { db } from '#firebase/firebase.js'
import { checkIsAdmin } from '#firebase/helpers.js'

const router = new Router()

// Endpoint to add a tag
router.post('/tag', async (ctx) => {
  try {
    const authHeader = ctx.request.headers.authorization
    const [bearer, token] = authHeader.split(' ')

    if (bearer !== 'Bearer') {
      // 400 Bad Request
      ctx.throw(400, 'Token must be Bearer')
    }

    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token)

    const isAdmin = checkIsAdmin(decodedToken.user_id)

    if (!isAdmin) {
      // 403 Forbidden
      ctx.throw(403, 'Only admins can create tags')
    }

    // Extract tag data from request body
    const { tag } = ctx.request.body

    if (!tag) {
      ctx.throw(400, 'Tag name is required!')
    }

    // Check if the "tags" collection exists
    const tagsCollectionRef = db.collection('tags')

    const tagToLowerCase = tag.toLowerCase()
    const getTagByName = await tagsCollectionRef.where('name', '==', tagToLowerCase).get()

    if (getTagByName.size !== 0) {
      ctx.throw(400, `Tag '${tagToLowerCase}' already exist!`)
    }

    // Add tag to collection
    await tagsCollectionRef.doc().set({ name: tagToLowerCase })

    // Respond with success message
    ctx.status = 201 // Created
    ctx.body = { success: true, message: `Tag '${tagToLowerCase}' added successfully` }
  } catch (error) {
    const { status, message } = error
    // 401 Unauthorized
    ctx.status = status || 401
    ctx.body = { success: false, message }
  }
})

export default router
