import {Routes, Route} from 'react-router-dom'
import '../index.css'
import Chat from './components/layout/Chat.jsx'
import ChatOp from './components/layout/ChatOp.jsx'
function App() {
  return (
    <Routes >
      <Route path="/" element={<Chat/>}/>
      <Route path="/ChatOp" element={<ChatOp/>}/>
    </Routes>
  );
}

export default App
