import { useTranslation } from 'react-i18next'

const Languages = [
    { code: 'pt', label: 'Português' },
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'fr', label: 'Français' },
    { code: 'de', label: 'Deutsch' },
    { code: 'it', label: 'Italiano' },
    { code: 'ja', label: '日本語' },
    { code: 'zh', label: '中文' },
    { code: 'ru', label: 'Русский' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'ar', label: 'العربية' }
]
function Language() {
    const { i18n } = useTranslation();
    
    const changeLanguage = async (lng) => {
        try {
            await i18n.changeLanguage(lng);
            console.log('Idioma alterado para:', lng);
        } catch (error) {
            console.error('Erro ao mudar idioma:', error);
        }
    }
    return (
        <div className="flex-wrap">
            {Languages.map((lgn) => (
                <button 
                    key={lgn.code} 
                    onClick={() => changeLanguage(lgn.code)} className={`m-2 bg-inherit rounded-md 
                    ${ lgn.code === i18n.language ? 'bg-blue-600 text-white' : 'text-white '}`}
                    disabled={lgn.code === i18n.language}>{lgn.label}
                </button>
            ))}
        </div>
    )

}
export default Language

