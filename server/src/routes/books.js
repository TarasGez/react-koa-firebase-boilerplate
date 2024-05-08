import Router from '@koa/router'
import firebaseAdmin, { db } from '#firebase/firebase.js'

const router = new Router()

// Endpoint to add a book
router.post('/book', async (ctx) => {
  try {
    const authHeader = ctx.request.headers.authorization
    const [bearer, token] = authHeader.split(' ')

    if (bearer !== 'Bearer') {
      // 400 Bad Request
      ctx.throw(400, 'Token must be Bearer')
    }

    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token)

    if (!decodedToken.user_id) {
      // 403 Forbidden
      ctx.throw(403, 'Only users can add books')
    }

    // Extract book data from request body
    const { title, description } = ctx.request.body

    if (!title) {
      ctx.throw(400, 'Book title is required!')
    }

    // Check if the "books" collection exists
    const booksCollectionRef = db.collection('books')

    const getBookByName = await booksCollectionRef.where('title', '==', title).get()

    if (getBookByName.size !== 0) {
      ctx.throw(400, `Book with title '${title}' already exist!`)
    }

    // Add book to collection
    await booksCollectionRef.doc().set({ title, description })

    // Respond with success message
    ctx.status = 201 // Created
    ctx.body = { success: true, message: `Book '${title}' added successfully` }
  } catch (error) {
    const { status, message } = error
    // 401 Unauthorized
    ctx.status = status || 401
    ctx.body = { success: false, message }
  }
})

export default router
