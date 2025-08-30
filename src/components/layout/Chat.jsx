import React from 'react';
import Button from '../layout/Button';
import {Menu, Paperclip,Volume,Image,Plus} from 'lucide-react'


function Chat() {
    //alert("Olá! Estou no início deste projeto. Se você gostou da ideia, seja bem-vindo para contribuir com sua ajuda! \n projeto ainda é apenas um interface😁")
    return (
            <div className="flex flex-col flex-wrap justify-center items-center h-screen w-full overflow-hidden paddEnv bg-red-900 p-0 m-0 img-bg">
                {/* Header */}
                <header className="h-20 w-full flex items-center flex-row text-white shadow-b-md z-10">
                    <div className="flex flex-col border-white h-16 w-32 items-center rounded-md shadow-md translate-x-2">
                        <Button className="h-14 w-14 flex items-center justify-center"><Menu className="text-white"/></Button>
                    </div>
                    <h1 className="ml-5 flex"><strong>LP web</strong></h1>
                </header>              
                {/* Messages Container */}
                <div className="flex flex-col justify-end items-center flex-1 w-full bg-[#1B1C1D] img-bg">
                        <h1 className="text-white font-bold absolute top-1/2 text-4xl">LaPlace</h1>
                        <div className="relative w-36 h-12 rounded-md sx bottom-2 -top-5">
                            <Volume className="text-white absolute left-6 top-1/2 -translate-y-1/2 hover:text-red-500" />
                            <Image className="text-white absolute left-12 top-1/2 -translate-y-1/2 hover:text-red-500" />
                            <Paperclip className="text-white absolute left-20 top-1/2 -translate-y-1/2 hover:text-red-500" />
                            <Plus className="text-white absolute left-28 top-1/2 -translate-y-1/2 hover:text-red-500" />
                        </div>
                    <div className="relative flex justify-end items-center border border-white border-b-2 rounded-3xl w-80 h-24 -translate-y-3 shadow-md xl:w-1/3 md:w-2/4">
                        <input type="text" placeholder="pergunte" className="absolute left-12 bg-transparent outline-none caret-white text-white "/>
                    </div>
                </div>
                <footer className="flex items-center justify-center  h-10 w-full text-white img-bg bg-[#1B1C1D] ">
                    LaPlca&trade;
                </footer>
            </div>
    )
     
}

export default Chat;