# Segredin Online Master

## Deploy no Vercel

Este projeto está configurado para deploy automático no Vercel.

### Configurações necessárias no Vercel:

1. **Build Command**: `npm run build`
2. **Output Directory**: `public`
3. **Install Command**: `npm install` (padrão)

### Estrutura do projeto:

- `index.html` - Página inicial
- `bem-vindo.html` - Página de boas-vindas
- `inicial.html` - Página inicial do usuário
- `pagamento-aprovado.html` - Página de confirmação de pagamento
- `registro.html` - Página de registro
- `editar-perfil.html` - Página de edição de perfil
- `chat/` - Diretório do chat
- `assets/` - Recursos estáticos (imagens, áudios, etc.)
- `wp-content/` - Conteúdo do WordPress
- `uploads/` - Uploads de mídia

### Como fazer deploy:

1. Conecte seu repositório ao Vercel
2. Configure as seguintes opções:
   - **Framework Preset**: Other
   - **Build Command**: `npm run build`
   - **Output Directory**: `public`
3. Faça o deploy

### Desenvolvimento local:

\`\`\`bash
npm run dev
\`\`\`

Isso iniciará um servidor local na porta 8000.
\`\`\`

```plaintext file=".gitignore"
node_modules/
.DS_Store
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
npm-debug.log*
yarn-debug.log*
yarn-error.log*
public/
dist/
build/
.vercel
