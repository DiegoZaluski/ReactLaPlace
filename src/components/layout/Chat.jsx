import React from 'react';
import Button from '../layout/Button';
import {Menu, Paperclip,Volume,Image,Plus} from 'lucide-react'


function Chat() {
    //alert("Olá! Estou no início deste projeto. Se você gostou da ideia, seja bem-vindo para contribuir com sua ajuda! \n projeto ainda é apenas um interface😁")
    return (
            <div className="flex flex-col flex-wrap justify-center items-center h-screen w-full overflow-x-hidden overflow-y-auto paddEnv" >
                {/* Header */}
                <header className="h-20 w-full self-start flex items-center flex-row text-white bg-red-900 shadow-b-md z-10">
                    <div className=" text-center flex flex-col border-white h-16 w-32 self-start items-center rounded-md mt-3  ml-2 shadow-md">
                        <Button className="h-14 w-14 flex items-center justify-center"><Menu className="text-white"/></Button>
                    </div>
                    <h1 className="ml-5 flex"><strong>LP web</strong></h1>
                </header>              
                {/* Messages Container */}
                <div className="flex  flex-col justify-end items-center flex-1 w-full bg-[#1B1C1D] img-bg">
                        <h1 className="text-white font-bold absolute top-1/2 text-4xl">LaPlace</h1>
                        <div className="relative w-36 h-12 rounded-md sx bottom-2">
                            <Volume className="text-white absolute left-6 top-1/2 -translate-y-1/2 hover:text-red-500" />
                            <Image className="text-white absolute left-12 top-1/2 -translate-y-1/2 hover:text-red-500" />
                            <Paperclip className="text-white absolute left-20 top-1/2 -translate-y-1/2 hover:text-red-500" />
                            <Plus className="text-white absolute left-28 top-1/2 -translate-y-1/2 hover:text-red-500" />
                        </div>
                    <div className=" relative flex justify-end items-center border-white h-24 w-96 border mb-10 border-b-2 rounded-[30px] xl:w-[40vw] md:w-[50vw] shadow-md">
                        <input type="text" placeholder="pergunte" className="absolute left-12 bg-transparent outline-none caret-white text-white "/>
                    </div>
                </div>
                <footer className="flex items-center justify-center  h-16 w-full  p- bg-[#0f0e0e] text-white">
                    version 1.0
                </footer>
            </div>
    )
     
}

export default Chat;