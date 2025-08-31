import Button from "../../../components/layout/Button";
import Language from "../../../components/shared/Language"
import { useTranslation } from "react-i18next";
import { Link} from "react-router-dom";
import { ArrowLeft } from "lucide-react";
function Register() {
    const { t, ready } = useTranslation(['auth']);
    if (!ready) return <div>Loading translate...</div>
    return(
        <div className='flex flex-col items-center justify-center w-full h-screen gap-5 relative img-bg bg-gray-950'>
            <Link to="/login" className='flex flex-row gap-2 text-center absolute left-10 top-10 text-white'>
                <ArrowLeft className="size={30}" /> {t('back')}
            </Link>
            <h1 className="text-5xl font-bold text-white">{t("register")}</h1>
            <div className="flex flex-col items-center bg-white m-5 pt-5 pr-10 pb-5 pl-10 rounded-md">
                
                <form className="flex flex-col gap-4" action="">
                    <input 
                        className="focus:outline-none font-medium" 
                        type="text" 
                        name="name"
                        //PASS CHANGE HERE
                        placeholder={t("name")} />
                    <input 
                        className="focus:outline-none font-medium" 
                        type="email" 
                        name="email"
                        //PASS CHANGE HERE
                        placeholder={t("email")}/>
                    <input 
                        className="focus:outline-none font-medium" 
                        type="password" 
                        name="password"
                        //PASS CHANGE HERE
                        placeholder={t('password')}/>
                    <input 
                        className="focus:outline-none font-medium" 
                        type="password"
                        name="confirmPassword"
                        //PASS CHANGE HERE
                        placeholder={t('confirmPassword')}/>
                    <Button type="submit" className="w-full h-10 p-0 border-black text-black bg-gray-700 border-none">{t('register')}</Button>
                    <div className="flex gap-2">
                        <a className="text-black hover:underline">{t('privacyPolicy')}</a> 
                        <p>|</p>
                        <Link to="/login" className="hover:underline">
                            {t('hasAccount')}
                        </Link>
                    </div>
                </form>       
            </div>
            <Language className='ml-5'/>
        </div>
    )
}
export default Register 
