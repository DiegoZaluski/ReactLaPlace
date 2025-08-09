import {useState} from 'react'
function Language() {
    const [language, setLanguage] = useState('pt-BR')
    const languages = [
        { code: 'pt-BR', label: 'Português' },
        { code: 'en-US', label: 'English' },
        { code: 'es-ES', label: 'Español' },
        { code: 'fr-FR', label: 'Français' },
        { code: 'de-DE', label: 'Deutsch' },
        { code: 'it-IT', label: 'Italiano' },
        { code: 'ja-JP', label: '日本語' },
        { code: 'zh-CN', label: '中文' },
        { code: 'ru-RU', label: 'Русский' },
        { code: 'hi-IN', label: 'हिन्दी' },
        { code: 'ar-SA', label: 'العربية' }
    ]
    function changeLanguage(code) {
        setLanguage(code)// criar um arquivo js para servir com i18n 
    }
    return(
        <div className="flex gap-2 text-white">
            <p>{language}</p>
          {languages.map((language) => (
            <button onClick={() => changeLanguage(language.code)}>{language.label}</button>
          ))}
        </div>
    )
}
export default Language