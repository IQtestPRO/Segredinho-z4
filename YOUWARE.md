# YOUWARE Project Documentation

## Project Overview
Este é um projeto de aplicação web para um app de relacionamentos/encontros chamado "Segredinho VIP". O projeto contém páginas HTML estáticas com funcionalidades interativas em JavaScript.

## Architecture Structure

### Core Files
- **index.html** - Página inicial/entrypoint principal
- **appminhacoroa.site/** - Diretório principal contendo todas as páginas da aplicação
  - **registro.html** - Página de cadastro/registro de usuários
  - **inicial.html** - Página principal com perfis para interação
  - **editar-perfil.html** - Página para edição de perfil do usuário
- **wp-content/uploads/** - Diretório de assets (imagens, logos, etc.)

### Key Features
1. **Sistema de Perfis**: Páginas para visualizar e interagir com perfis de usuários
2. **Upload de Imagens**: Funcionalidade para upload e preview de fotos de perfil
3. **Sistema de Match**: Lógica de curtidas e matches entre usuários
4. **Interface Responsiva**: Design adaptado para dispositivos móveis

### Image Management
- Upload de imagens com preview automático
- Compressão de imagens no frontend usando Canvas API
- Validação de tipo e tamanho de arquivo
- Sistema de slots para múltiplas fotos (até 3 fotos por perfil)
- Funcionalidade de remoção de imagens com feedback visual

### Styling Architecture
- Uso de CSS customizado (não Tailwind por padrão)
- Design com gradientes e tema roxo/preto
- Componentes reutilizáveis para botões, cards e formulários
- Estilo mobile-first com responsividade

### JavaScript Functionality
- Gerenciamento de estado local usando localStorage
- Funções de validação de formulários
- Sistema de carousel para múltiplas imagens
- Popups e modais para interações
- Sistema de recompensas/gamificação

### Brand Identity
- Nome atual: "Segredinho VIP"
- Cores principais: Roxo (#ae00ff, #b941ff) e preto
- Logo localizada em: `wp-content/uploads/2025/04/logoCoroa.png`

## Development Guidelines

### File Structure Conventions
- Todas as páginas principais ficam em `appminhacoroa.site/`
- Assets de imagem ficam em `wp-content/uploads/`
- O entrypoint principal deve sempre ser `index.html` na raiz

### Image Upload System
- Suporte a formatos: image/*
- Tamanho máximo: 5MB por imagem
- Compressão automática para otimização
- Preview instantâneo com possibilidade de remoção
- Validação de arquivo e tratamento de erros

### Important Notes
- O projeto usa estrutura estática HTML/CSS/JS
- Não há sistema de backend integrado (sugestão: considerar Supabase para persistência)
- Design focado em experiência mobile
- Sistema de gamificação com PIX/recompensas simuladas
