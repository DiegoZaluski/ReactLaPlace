import React from 'react';
import Button from '../layout/Button';
import {Menu, Paperclip,Volume,Image,Plus} from 'lucide-react'


function Chat() {
    alert("Olá! Estou no início deste projeto. Se você gostou da ideia, seja bem-vindo para contribuir com sua ajuda!")
    return (
            <div className="flex flex-col flex-wrap justify-center items-center h-full" >
                {/* Header */}
                <header className="h-[10vh] w-full self-start flex items-center flex-row text-white bg-red-900 shadow-b-md z-10">
                    <div className=" text-center flex flex-col items-center justify-center border-white h-[8vh] w-[12vw] self-start rounded-md mt-3  ml-2 shadow-md">
                        <Button className="h-[45px] w-[45px] flex items-center justify-center"><Menu className="text-white"/></Button>
                    </div>
                    <h1 className="ml-5 flex"><strong>LP web</strong></h1>
                </header>              
                {/* Messages Container */}
                <div className="flex items-end flex-col justify-end items-center h-[83vh] w-full bg-[#1B1C1D] img-bg">
                        <h1 className="text-white font-bold absolute top-[50%] text-4xl">LaPlace</h1>
                        <div className="relative sx w-[150px] h-[50px] rounded-md bottom-2">
                            <Volume className="text-white absolute left-[25px] top-[50%] translate-y-[-50%] hover:text-red-500"/>
                            <Image className="text-white absolute left-[50px] top-[50%] translate-y-[-50%] hover:text-red-500"/> 
                            <Paperclip className="text-white absolute left-[80px] top-[50%] translate-y-[-50%] hover:text-red-500"/>
                            <Plus className="text-white absolute left-[110px] top-[50%] translate-y-[-50%] hover:text-red-500"/>
                        </div>
                    <div className=" relative flex justify-end items-center border-white h-[10vh] w-[90vw] border mb-1 ml-2 mr-2 mb-10 border-b-2 rounded-[30px] xl:w-[40vw] md:w-[50vw] shadow-md">
                        <input type="text" placeholder="pergunte" className="absolute left-12 bg-transparent outline-none caret-white text-white "/>
                    </div>
                </div>
                <footer className="flex items-center justify-center  h-[7vh] w-[100vw]  p- bg-[#0f0e0e] text-white absolute bottom-0">
                    version 1.0
                </footer>
            </div>
    )
     
}

export default Chat;