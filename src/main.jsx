console.log('main.jsx carregado')
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../App.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import '../i18n/i18n.js';

console.log('Elemento root encontrado:', document.getElementById('root'))

const rootElement = document.getElementById('root')

if (!rootElement) {
  console.error('Elemento com id "root" não encontrado no DOM')
  // Cria um elemento de aviso visível na página
  const errorDiv = document.createElement('div')
  errorDiv.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; background: #ff4444; color: white; padding: 20px; text-align: center; z-index: 10000;'
  errorDiv.textContent = 'Erro: Elemento com id "root" não encontrado. Verifique o console para mais detalhes.'
  document.body.appendChild(errorDiv)
} else {
  try {
    const root = createRoot(rootElement)
    console.log('React está sendo montado no elemento root')
    root.render(
      <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StrictMode>
    )
  } catch (error) {
    console.error('Erro ao renderizar o React:', error)
    // Mostra o erro na página
    const errorDiv = document.createElement('div')
    errorDiv.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; background: #ff4444; color: white; padding: 20px; text-align: center; z-index: 10000; white-space: pre;'
    errorDiv.textContent = `Erro ao renderizar o React: ${error.message}\n\nVerifique o console para mais detalhes.`
    document.body.appendChild(errorDiv)
  }
}
