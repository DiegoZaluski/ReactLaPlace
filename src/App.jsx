import {Routes, Route} from 'react-router-dom'
import '../index.css'
import Chat from './components/layout/Chat.jsx'
import ResBox from './components/layout/ResBox.jsx'
function App() {
  return (
    <Routes >
      <Route path="/" element={<Chat/>}/>
      <Route path='/resbox' element={<ResBox/>}/>
    </Routes>
  );
}

export default App
