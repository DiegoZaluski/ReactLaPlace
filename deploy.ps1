# Script para ajudar no deploy do GitHub Pages
Write-Host "Preparando para fazer deploy no GitHub Pages..."

# Verifica se há mudanças não commitadas
$status = git status --porcelain
if ($status) {
    Write-Host "\n⚠️  Existem mudanças não commitadas. Por favor, faça commit das suas alterações primeiro."
    Write-Host "Mudanças pendentes:"
    $status
    exit 1
}

# Faz push para o repositório remoto
Write-Host "\n🔄 Enviando alterações para o GitHub..."
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "\n✅ Deploy iniciado com sucesso!"
    Write-Host "Seu site estará disponível em: https://seu-usuario.github.io/seu-repositorio/"
    Write-Host "\nObservação: Pode levar alguns minutos para o GitHub Pages atualizar o site."
} else {
    Write-Host "\n❌ Ocorreu um erro ao enviar as alterações para o GitHub."
}
