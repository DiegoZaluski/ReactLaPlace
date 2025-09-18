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
function Language({className}) {
    const { i18n } = useTranslation();
    
    const handleLanguageChange = async (languageCode) => {
        try {
            await i18n.changeLanguage(languageCode);
            console.log('Language changed to:', languageCode);
        } catch (error) {
            console.error('Error changing language:', error);
        }
    }
    return (
        <div className={`flex-wrap  ${className}`}>
            {Languages.map((language) => (
                <button 
                    key={language.code} 
                    onClick={() => handleLanguageChange(language.code)} className={`m-2 bg-inherit rounded-md 
                    ${ language.code === i18n.language ? 'bg-blue-600 text-white' : 'text-white '}`}
                    disabled={language.code === i18n.language}>{language.label}
                </button>
            ))}
        </div>
    )

}
export default Language

