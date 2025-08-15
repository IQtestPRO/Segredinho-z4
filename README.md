# Segredin Online Master

Plataforma online do Segredin VIP.

## Deploy no Vercel

Este projeto está configurado para deploy automático no Vercel.

### Configurações necessárias:

- **Framework Preset**: Other
- **Build Command**: `npm run build`
- **Output Directory**: `public`
- **Install Command**: `npm install`

## Estrutura do Projeto

- `index.html` - Página inicial
- `bem-vindo.html` - Página de boas-vindas
- `inicial.html` - Página inicial do usuário
- `pagamento-aprovado.html` - Confirmação de pagamento
- `registro.html` - Página de registro
- `editar-perfil.html` - Edição de perfil
- `chat/` - Sistema de chat
- `assets/` - Recursos estáticos
- `wp-content/` - Conteúdo WordPress
- `uploads/` - Arquivos enviados

## Como funciona o build

O script de build cria uma pasta `public` e copia todos os arquivos HTML e recursos necessários para ela.
\`\`\`

\`\`\`plaintext file=".gitignore"
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Build outputs
public/
dist/
build/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# IDE files
.vscode/
.idea/
*.swp
*.swo

# Logs
logs
*.log

# Temporary files
tmp/
temp/
