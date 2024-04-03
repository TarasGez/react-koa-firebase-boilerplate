import { memo } from 'react'
import { useAuthWithFirebase } from 'src/services/useAuthWithFirebase'

const Login = () => {
  const { authWithGoogle } = useAuthWithFirebase()

  return (
    <>
      <button onClick={authWithGoogle}>Login with Google</button>
    </>
  )
}

const MemoLogin = memo(Login)

export default MemoLogin
