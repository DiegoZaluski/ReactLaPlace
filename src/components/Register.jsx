import Button from "./Button";
import Language from "./Language"
function Register() {
    return(
        <div className='flex flex-col items-center justify-center w-full h-screen gap-5'>
            <h1 className="text-5xl font-bold text-white">Cadastro</h1>
            <div className="flex flex-col items-center bg-white m-5 pt-5 pr-10 pb-5 pl-10 rounded-md">
                
                <form className="flex flex-col gap-4" action="">
                    <input className="focus:outline-none font-medium" type="text" placeholder="Nome" />
                    <input className="focus:outline-none font-medium" type="email" placeholder="Email ou telefone" />
                    <input className="focus:outline-none font-medium" type="password" placeholder="Senha" />
                    <Button type="submit" className="w-full border-black text-black">Cadastrar</Button>
                    <div className="flex gap-2">
                        <a href="" className="text-black hover:underline">politica de privacidade</a> 
                        <p>|</p>
                        <a href="#" className="text-black hover:underline">Já tem uma conta?</a>
                    </div>
                </form>       
                
            </div>
            <Language />
        </div>
    )
}
export default Register