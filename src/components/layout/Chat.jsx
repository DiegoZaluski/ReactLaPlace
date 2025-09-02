import {React, useState }from 'react';
import Button from '../layout/Button';
import {Menu, Paperclip,Volume,Image,Plus} from 'lucide-react'
import {useTranslation} from 'react-i18next';
import Op from '../layout/Op';


function Chat() {
    const [showOp, setShowOp] = useState(false);
    const [message, setMessage] = useState('');
    const { t, ready } = useTranslation(['auth'])
    if (!ready) return <div>Loading translate...</div>
    //alert(t("alert"))
    return (
            <div className="flex flex-col flex-wrap justify-center items-center h-screen w-full paddEnv bg-gray-950 img-bg p-0 m-0 img-bg noScroll">
                {/* Header */}
                <header className="h-20 w-full flex items-center flex-row text-white shadow-b-md z-10">
                    <Op className={`${showOp ? 'translate-y-0': 'translate-y-[-100%]'}`}/>
                    <div className="flex flex-col border-white h-16 w-32 items-center justify-center rounded-md shadow-md translate-x-2">
                        <Button 
                        onClick={() => setShowOp(!showOp)}
                        className="h-14 w-14 flex items-center justify-center"><Menu className="text-white"/></Button>
                    </div>
                    <h1 className="ml-5 flex"><strong>LP web</strong></h1>
                </header>              
                {/* Messages Container */}
                <div
                onClick={() => setShowOp(false)}
                 className="flex flex-col justify-end items-center flex-1 w-full bg-gray-950 img-bg">
                        <h1 className="text-white font-bold absolute top-1/2 text-4xl">LaPlace</h1>
                        <div className="relative w-36 h-12 rounded-md sx bottom-2 -top-5">
                            <Volume className="text-white absolute left-6 top-1/2 -translate-y-1/2 hover:text-red-500" />
                            <Image className="text-white absolute left-12 top-1/2 -translate-y-1/2 hover:text-red-500" />
                            <Paperclip className="text-white absolute left-20 top-1/2 -translate-y-1/2 hover:text-red-500" />
                            <Plus className="text-white absolute left-28 top-1/2 -translate-y-1/2 hover:text-red-500" />
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
                <footer className="flex items-center justify-center  h-10 w-full text-white img-bg bg-gray-950 text-sm">
                    LaPlca&trade;
                </footer>
            </div>
    )
     
}

export default Chat;