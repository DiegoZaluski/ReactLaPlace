import {Routes, Route} from 'react-router-dom'
import '../App.css'
import Login from './features/auth/components/Login'
import Register from './features/auth/components/Register'
import Chat from './components/layout/Chat.jsx'
function App() {
  return (
    <Routes >
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/chat" element={<Chat/>}/>
    </Routes>
  );
}

export default App
