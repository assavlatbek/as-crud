import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import StudentPage from './pages/StudentPage'
import TeacherPage from './pages/TeacherPage'
import LoginPage from './pages/LoginPage'
import LayoutPage from './components/Layout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to={'/login'} />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/' element={<LayoutPage />}>
          <Route path='student' element={<StudentPage />} />
          <Route path='teacher' element={<TeacherPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App