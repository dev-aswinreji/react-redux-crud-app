import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './pages/Signup'


function App() {
    return (
      <BrowserRouter>
      <Routes>

        <Route path='/signup' element={<SignUp/>} />
      </Routes>
      </BrowserRouter>
  )
}

export default App
