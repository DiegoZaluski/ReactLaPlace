import {Routes, Route} from 'react-router-dom'
import '../index.css'
import Chat from './components/layout/Chat.jsx'
import ChatOp from './components/layout/ChatOp.jsx'
import ResBox from './components/layout/ResBox.jsx'
function App() {
  return (
    <Routes >
      <Route path="/" element={<Chat/>}/>
      <Route path="/chatOp" element={<ChatOp/>}/>
      <Route path='/resbox' element={<ResBox/>}/>
    </Routes>
  );
}

export default App
