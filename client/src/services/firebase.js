// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { FIREBASE_CONFIG } from 'src/config'

// Initialize Firebase
const app = initializeApp(FIREBASE_CONFIG)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)

export default app
