import Button from '../../../components/ui/Button';
import {useTranslation} from 'react-i18next';
import Language from '../../../components/shared/Language';
import { Link } from 'react-router-dom';

const Login = () => {
  const {t, ready} = useTranslation(['auth']);
  if (!ready) return <div>loading translate...</div>
  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 gap-5">
      <div className="w-[450px] space-y-4 flex flex-col border rounded-md p-6">
        <h1 className="text-2xl font-bold text-white">{t('login')}</h1>
        
        <input 
          type="email" 
          placeholder={t('email')} 
          className="p-2 border border-slate-400 rounded focus:outline-none"
        />
        
        <input 
          type="password" 
          placeholder="Digite sua senha" 
          className="p-2 border border-slate-400 rounded focus:outline-none"
        />
        
        <div className="w-full flex gap-3">
          <Link to="/register">
            <Button className="hover:bg-[#24292e]">
              {t('login')}
            </Button>
          </Link>
          <Button className="bg-green-700 hover:bg-green-600 border-green-700 w-full">
            {t('register')}
          </Button>
        </div>
        
        <a href="#" className="text-white hover:underline">
          {t('forgotPassword')}
        </a>
      </div>
      <Language/>
    </div>
  );
}

export default Login;