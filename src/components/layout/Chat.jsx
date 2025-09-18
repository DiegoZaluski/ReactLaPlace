import {React, useState }from 'react';
import Button from './Button';
import {Menu,X, Paperclip,Volume,Image,Plus} from 'lucide-react'
import {useTranslation} from 'react-i18next';
import ChatOp from './ChatOp';


function Chat() {
    const [showOp, setShowOp] = useState(false);
    const [message, setMessage] = useState('');
    const { t, ready } = useTranslation(['auth'])
    if (!ready) return <div>Loading translate...</div>
    //alert(t("alert"))
    return (
            <div className="flex flex-col flex-wrap justify-center items-center h-screen w-full paddEnv bg-[#151517] p-0 m-0 noScroll">
                {/* Header */}
                <header className="h-20 w-full flex items-center flex-row text-white shadow-b-md z-10">
                    <ChatOp className={`${showOp ? 'translate-x-0': 'translate-x-[-100%]'}`}/>
                    <div className="flex flex-col border-white h-auto w-auto items-center justify-center shadow-md translate-x-2 active:bg-gray-500 rounded-md ml-10">
                        <Button Minus 
                            onClick={() => setShowOp(!showOp)}
                            className="h-14 w-14 flex items-center justify-center">{showOp? <X className="text-white h-6 w-6"/> : <Menu className="text-white h-6 w-6"/>}
                        </Button>
                    </div>
                    <h1 className="ml-5 flex"><strong>LP web</strong></h1>
                </header>              
                {/* Messages Container */}
                <div
                onClick={() => setShowOp(false)}
                 className="flex flex-col justify-end items-center flex-1 w-full bg-[#151517] img-bg">
                        <h1 className="text-white font-bold absolute top-1/2 text-4xl">LaPlace</h1>
                        <div className="flex w-14 h-12 rounded-md sx bottom-2 transform -translate-y-1/2 items-center justify-center">
                            <Plus className="text-white hover:text-red-500" />
                        </div>
                    <div className="relative w-80 xl:w-1/3 md:w-2/4 -translate-y-3">
                        <textarea
                            placeholder={t("question")}
                            value={message}
                            className="w-full min-h-[6rem] max-h-40 bg-transparent outline-none caret-white text-white border border-white border-b-2 rounded-3xl p-4 pr-12 resize-none overflow-hidden shadow-b-xl"
                            onChange={(e) => {
                                setMessage(e.target.value);
                                // Ajusta a altura automaticamente
                                e.target.style.height = 'auto';
                                e.target.style.height = e.target.scrollHeight + 'px';
                            }}
                            rows="1"
                            style={{ scrollbarWidth: 'none' }} // Esconde a barra de rolagem no Firefox
                        />
                    </div>
                </div>
                <footer className="flex items-center justify-center  h-10 w-full text-white img-bg bg-[#151517] text-sm">
                    LaPlca&trade;
                </footer>
            </div>
    )
     
}

export default Chat;