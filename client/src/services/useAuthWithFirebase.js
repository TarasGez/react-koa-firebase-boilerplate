import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from 'src/services/firebase'
import { useAuth, useUserData } from 'src/providers/hooks'

export const useAuthWithFirebase = () => {
  const { onLogin } = useAuth()
  const { setUserData } = useUserData()

  const authWithGoogle = async () => {
    const provider = new GoogleAuthProvider()

    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      setUserData(user)

      // Obtain the ID token
      const idToken = await user.getIdToken()
      onLogin(idToken)
    } catch (error) {
      console.error(error)
      // Handle error
    }
  }

  return { authWithGoogle }
}
