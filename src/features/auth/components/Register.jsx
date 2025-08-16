import Button from "../../../components/ui/Button";
import Language from "../../../components/shared/Language"
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
function Register() {
    const { t, ready } = useTranslation(['auth']);
    if (!ready) return <div>Loading translate...</div>
    return(
        <div className='flex flex-col items-center justify-center w-full h-screen gap-5'>
            <ArrowLeft/> {/*<- ponto de parada terminar de ajustar este botão de voltar*/}
            <h1 className="text-5xl font-bold text-white">{t("register")}</h1>
            <div className="flex flex-col items-center bg-white m-5 pt-5 pr-10 pb-5 pl-10 rounded-md">
                
                <form className="flex flex-col gap-4" action="">
                    <input className="focus:outline-none font-medium" type="text" placeholder={t("name")} />
                    <input className="focus:outline-none font-medium" type="email" placeholder={t("email")}/>
                    <input className="focus:outline-none font-medium" type="password" placeholder={t('password')}/>
                    <Button type="submit" className="w-full border-black text-black">{t('register')}</Button>
                    <div className="flex gap-2">
                        <a className="text-black hover:underline">{t('privacyPolicy')}</a> 
                        <p>|</p>
                        <Link to="/login"><a className="text-black hover:underline">{t('hasAccount')}</a></Link>
                    </div>
                </form>       
                
            </div>
            <Language/>
        </div>
    )
}
export default Register 
