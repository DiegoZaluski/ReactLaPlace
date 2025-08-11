import {Routes, Route} from 'react-router-dom'
import '../App.css'
import Login from './features/auth/components/Login'
import Register from './features/auth/components/Register'
function App() {
  return (
    <Routes >
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register/>}/>
    </Routes>
  );
}

export default App
