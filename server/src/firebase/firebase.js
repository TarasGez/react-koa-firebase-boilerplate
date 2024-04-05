import firebaseAdmin from 'firebase-admin'

// Initialize Firebase Admin SDK with secret key
import serviceAccount from '#admin/serviceAccountKey.js'
import { boldText, greenColor, greyColor, redColor, resetText } from '#constants/console.js'
import { adminsArray } from './admins.js'

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(JSON.parse(JSON.stringify(serviceAccount))),
  databaseURL: 'https://crazybeeteam-7faa5.firebaseapp.com',
})

// Example function to check connection to Firebase
const checkFirebaseConnection = async () => {
  try {
    // Fetch a user from Firebase Authentication
    const user = await firebaseAdmin.auth().getUser(adminsArray[0].id)

    // If the operation succeeds, log a success message
    console.log(
      `  ${greyColor}➜${resetText} 📡 Connection to Firebase ${greenColor}successful${resetText}.\n  ${greyColor}➜${resetText} 🤖 Admin: ${boldText}${greenColor}${user.displayName}${resetText}`
    )
  } catch (error) {
    // If an error occurs, log the error
    console.error(`\n${boldText}${redColor}Error connecting to Firebase:${resetText}`, error)
  }
}

// Call the function to check Firebase connection
checkFirebaseConnection()

export const db = firebaseAdmin.firestore()

export default firebaseAdmin
