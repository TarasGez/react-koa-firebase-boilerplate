import { useEffect, useState } from 'react'
import { postTags, rootGet, authTest } from 'src/api'
import { Login, Logout } from 'src/components'
import { useUserData } from 'src/providers/hooks'

const MainPage = () => {
  const [data, setData] = useState({ name: '' })
  const [isGuest, setIsGuest] = useState(true)
  const { getUserData } = useUserData()

  useEffect(() => {
    const user = getUserData()
    const _isGuest = user?.providerId === 'test'
    setIsGuest(_isGuest)
    setData(user)
  }, [getUserData])

  const getTestUser = () => {
    rootGet().then((resp) => {
      setData(resp)
      console.log('resp', resp)
    })
  }

  const postTagsList = () => {
    const tags = ['one', 'two', 'three']
    console.log('1 tags:', tags)
    postTags(tags).then((resp) => {
      setData(resp)
      console.log('resp tags', resp)
    })
  }

  const postAuthTest = () => {
    authTest().then((resp) => {
      setData(resp)
      console.log('Auth resp: ', resp)
    })
  }

  return (
    <div>
      <p>User: {data.name}</p>
      <div style={{ display: 'flex', flexDirection: 'column', width: 'fit-content', gap: '10px' }}>
        <button onClick={postAuthTest}>Test auth token</button>

        <button onClick={getTestUser}>Get Test User from BE</button>
        <button onClick={postTagsList}>Post tags</button>
        {isGuest && <Login />}
        {!isGuest && <Logout />}
      </div>
    </div>
  )
}

export default MainPage
