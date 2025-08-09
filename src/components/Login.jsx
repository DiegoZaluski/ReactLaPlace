import Button from './Button';

const Login = () => (
  <div className="flex flex-col items-center justify-center h-screen p-6">
    <div className="w-[450px] space-y-4 flex flex-col border rounded-md p-6">
      <h1 className="text-2xl font-bold text-white">Login</h1>
      
      <input 
        type="email" 
        placeholder="Digite seu email" 
        className="p-2 border border-slate-400 rounded focus:outline-none"
      />
      
      <input 
        type="password" 
        placeholder="Digite sua senha" 
        className="p-2 border border-slate-400 rounded focus:outline-none"
      />
      
      <div className="w-full flex gap-3">
        <Button className="w-[5em] hover:bg-[#24292e]">
          Entrar
        </Button>
        <Button className="bg-green-700 hover:bg-green-600 border-green-700 w-full">
          Criar conta
        </Button>
      </div>
      
      <a href="#" className="text-white hover:underline">
        Recuperar senha
      </a>
    </div>
  </div>
);

export default Login;