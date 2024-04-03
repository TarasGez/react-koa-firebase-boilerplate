import firebaseAdmin from 'firebase-admin'

// Initialize Firebase Admin SDK with secret key
import serviceAccount from '#admin/serviceAccountKey.js'

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(JSON.parse(JSON.stringify(serviceAccount))),
  databaseURL: 'https://crazybeeteam-7faa5.firebaseapp.com',
})

// Example function to check connection to Firebase
const checkFirebaseConnection = async () => {
  try {
    // Fetch a user from Firebase Authentication (or perform any other operation)
    const user = await firebaseAdmin.auth().getUser('GL1SISZNIMMqkT5HWUVSFwDsJH82')

    // If the operation succeeds, log a success message
    console.log('Connection to Firebase successful.\nAdmin:', user.displayName)
  } catch (error) {
    // If an error occurs, log the error
    console.error('Error connecting to Firebase:', error)
  }
}

// Call the function to check Firebase connection
checkFirebaseConnection()

export default firebaseAdmin
