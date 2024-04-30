import { Route, Routes } from 'react-router-dom'
import { AddBookPage, MainPage } from 'src/pages'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/add-book" element={<AddBookPage />} />
    </Routes>
  )
}

export default AppRoutes
