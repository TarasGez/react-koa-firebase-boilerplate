import { Link } from 'react-router-dom'
import { useUserData } from 'src/hooks'

const Header = () => {
  const { getUserData, isAdmin } = useUserData()
  const user = getUserData()
  console.log('user', user)

  return (
    <div>
      <ul>
        <li>
          {user && <Link to="/add-book">Add Book</Link>}
          {isAdmin ? <Link to="/add-tag">Add Tag</Link> : null}
        </li>
      </ul>
    </div>
  )
}

export default Header
