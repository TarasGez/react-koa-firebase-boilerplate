import { useEffect, useState } from 'react'
import { postTag, authTest } from 'src/api'
import { Login, Logout } from 'src/components'
import { useError, useUserData } from 'src/providers/hooks'

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

  const addTag = async (ev) => {
    const { value } = ev.target.tagName

    if (value) {
      const resp = await postTag(value)
      console.log('resp', resp)
    }
  }

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

        <form onSubmit={addTag}>
          <input type="text" id="tagName" name="tagName" />
          <button type="submit">Add tag</button>
        </form>

        {isGuest && <Login />}
        {!isGuest && <Logout />}
      </div>
    </div>
  )
}

export default MainPage
