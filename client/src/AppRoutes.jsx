import { Route, Routes } from 'react-router-dom'
import { MainPage } from 'src/pages'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
    </Routes>
  )
}

export default AppRoutes
