import Router from '@koa/router'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import admin from '#firebase/firebase.js'

const router = new Router()
const db = admin.database()

// Endpoint to create a list of tags
router.post('/tags', async (ctx) => {
  try {
    const authHeader = ctx.request.headers.authorization
    console.log('___authHeader: ', authHeader)
    const [bearer, token] = authHeader.split(' ')

    if (bearer !== 'Bearer') {
      ctx.status = 400 // Bad Request
      ctx.body = { success: false, message: 'Token must be Bearer' }
      return
    }

    const decodedToken = await admin.auth().verifyIdToken(token)
    console.log('___decodedToken: ', decodedToken)

    // if (!isAdmin) {
    //   ctx.throw(403, 'Only admins can create tags')
    // }

    // Extract tag data from request body
    const tagList = ctx.request.body.tagList
    console.log('tagList: ', tagList)

    // Store tags in Firebase Firestore
    // const tagsCollectionRef = collection(db, 'tags')
    // await Promise.all(
    //   tagList.map(async (tag) => {
    //     await addDoc(tagsCollectionRef, { text: tag })
    //   })
    // )

    // Respond with success message
    ctx.status = 201 // Created
    ctx.body = { success: true, message: 'Tags created successfully' }
  } catch (error) {
    const { message } = error
    ctx.status = 401
    ctx.body = { success: false, message }
  }
})

export default router
