import { memo } from 'react'
import { useAuth, useUserData } from 'src/providers/hooks'

function Logout() {
  const { onLogout } = useAuth()
  const { setUserData } = useUserData()

  const logout = () => {
    onLogout()
    setUserData(null)
  }

  return (
    <>
      <button onClick={logout}>Logout</button>
    </>
  )
}

const MemoLogout = memo(Logout)

export default MemoLogout
