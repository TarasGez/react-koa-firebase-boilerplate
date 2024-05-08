import { useEffect, useState } from 'react'
import { authTest } from 'src/api'
import { Login, Logout } from 'src/components'
import { useError, useUserData } from 'src/hooks'

const MainPage = () => {
  const [data, setData] = useState({ name: '' })
  const [isGuest, setIsGuest] = useState(true)
  const { getUserData } = useUserData()
  const { setError } = useError()

  useEffect(() => {
    const user = getUserData()
    const _isGuest = user?.providerId === 'test'
    setIsGuest(_isGuest)
    setData(user)
  }, [getUserData])

  const postAuthTest = () => {
    authTest()
      .then((resp) => {
        setData(resp)
        console.log('Auth resp: ', resp)
      })
      .catch((error) => setError(error))
  }

  return (
    <div>
      <p>User: {data.name}</p>
      <div style={{ display: 'flex', flexDirection: 'column', width: 'fit-content', gap: '10px' }}>
        <button onClick={postAuthTest}>Test auth token</button>

        {isGuest && <Login />}
        {!isGuest && <Logout />}
      </div>
    </div>
  )
}

export default MainPage
