import {Routes, Route} from 'react-router-dom'
import '../index.css'
import Login from './features/auth/components/Login'
import Register from './features/auth/components/Register'
import Chat from './components/layout/Chat.jsx'
import Op from './components/layout/Op.jsx'
function App() {
  return (
    <Routes >
      <Route path="/" element={<Chat/>}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/op" element={<Op/>}/>
    </Routes>
  );
}

export default App
