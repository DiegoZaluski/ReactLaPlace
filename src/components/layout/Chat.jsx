import React from 'react';
import Button from '../layout/Button';
import {Menu} from 'lucide-react'


function Chat() {
    return (
        <div className="flex flex-row items-center h-screen w-screen gap-1 bg-[#303030]">
            {/* Sidebar Options */}
            <div className=" text-center flex flex-col items-center justify-center border-white h-[10vh] w-[15vw] self-start rounded-md mt-3  ml-2 shadow-md">
                <Button className="h-[55px] w-[55px] flex items-center justify-center"><Menu className="text-white"/></Button>
            </div>
            {/* Main Chat Area */}
            <div className="flex flex-col flex-wrap gap-1 h-full">
                {/* Header */}
                <div className="h-[10vh] w-[85vw] self-start mt-3 rounded-md flex items-center text-white shadow-md ">
                    <h1 className="ml-5"><strong>LP web</strong></h1>
                </div>              
                {/* Messages Container */}
                <div className="flex items-end justify-center h-[81vh] w-[85vw] bg-[#303030]">
                    <div className="border-white h-[10vh] w-[90vw] border mb-1 ml-2 mr-2 mb-10 border-b-2 rounded-[30px] md:w-[50vw] shadow-md">
                        {/* Message input will go here */}
                    </div>
                </div>
            </div>
            <footer className="flex flex-row h-[7vh] w-[100vw]  p- bg-[#3f3f3f] absolute bottom-0">
            </footer>
        </div>
    );
}

export default Chat;