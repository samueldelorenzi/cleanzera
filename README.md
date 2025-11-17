# Cleanzera 🏆

Sistema de controle antidoping para atletas - Gerenciamento completo de atletas, testes e relatórios.

## 📋 Descrição

Cleanzera é um sistema web para rastreamento e gerenciamento de exames antidoping de atletas, desenvolvido para facilitar o controle de testes, resultados e geração de relatórios estatísticos.

## ✨ Funcionalidades

### 🔐 Autenticação
- Login seguro com JWT
- Senhas hasheadas com bcrypt (salt + pepper)
- Proteção de rotas via middleware
- Cookies httpOnly para segurança

### 👥 Gestão de Atletas
- Cadastro de atletas com dados completos
- Listagem com busca e filtros
- Edição inline de informações
- Exclusão com confirmação
- Validação de CPF único

### 🧪 Gestão de Testes
- Registro de testes antidoping (Urina, Sangue, Saliva)
- Associação com atletas
- Resultados (Negativo, Positivo, Inconclusivo)
- Histórico completo de testes
- Visualização organizada por data

### 📊 Relatórios e Dashboard
- Dashboard com métricas em tempo real
- Total de atletas e testes
- Contadores de positivos/negativos
- Testes recentes
- Agregações por tipo e resultado
- Consultas personalizadas

### 🎨 Interface
- Design responsivo (mobile-first)
- Notificações toast para feedback
- Estados de loading
- Gradientes e animações suaves
- Layout consistente em todas as páginas

## 🛠️ Tecnologias

- **Frontend:** Next.js 15, React, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes
- **Banco de Dados:** PostgreSQL (Supabase)
- **Autenticação:** JWT (jose), bcryptjs
- **Validação:** ESLint

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- PostgreSQL (ou conta Supabase)

### Instalação

1. Clone o repositório:
```bash
git clone <repository-url>
cd cleanzera
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
# Crie um arquivo .env.local
DATABASE_URL=sua_connection_string_postgresql
JWT_SECRET=sua_chave_secreta_jwt
PASSWORD_PEPPER=seu_pepper_para_senhas
```

4. Execute as migrações do banco:
```bash
npm run migrate up
```

5. Crie o usuário admin padrão:
```bash
node seed-admin.js
```

6. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

7. Acesse http://localhost:3000

## 🔑 Credenciais Padrão

```
Email: admin@cleanzera.com
Senha: admin123
```

⚠️ **IMPORTANTE:** Altere estas credenciais em produção!

## 📁 Estrutura do Projeto

```
cleanzera/
├── src/
│   ├── app/
│   │   ├── api/              # API Routes
│   │   │   ├── auth/         # Autenticação
│   │   │   ├── athletes/     # CRUD Atletas
│   │   │   ├── tests/        # CRUD Testes
│   │   │   └── reports/      # Relatórios
│   │   ├── components/       # Componentes React
│   │   ├── atletas/          # Gerenciar atletas
│   │   ├── testes/           # Gerenciar testes
│   │   ├── cadastro-atletas/ # Cadastro
│   │   ├── registro-testes/  # Registro
│   │   ├── consultas/        # Consultas
│   │   ├── relatorios/       # Relatórios
│   │   ├── login/            # Login
│   │   └── page.tsx          # Home/Dashboard
│   └── lib/
│       ├── auth.ts           # Utilitários de autenticação
│       └── db.ts             # Cliente PostgreSQL
├── migrations/               # Migrações do banco
├── proxy.ts                  # Middleware de autenticação
└── seed-admin.js            # Script de seed

```

## 🔒 Segurança

- Senhas hasheadas com bcrypt (12 rounds + pepper)
- Tokens JWT com expiração de 24h
- Cookies httpOnly e secure
- Validação de tipos com TypeScript
- Proteção contra SQL injection (queries parametrizadas)
- Middleware de autenticação em todas as rotas

## 📝 API Endpoints

### Autenticação
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Verificar autenticação

### Atletas
- `GET /api/athletes` - Listar atletas
- `POST /api/athletes` - Criar atleta
- `GET /api/athletes/:id` - Buscar atleta
- `PUT /api/athletes/:id` - Atualizar atleta
- `DELETE /api/athletes/:id` - Deletar atleta

### Testes
- `GET /api/tests` - Listar testes
- `POST /api/tests` - Criar teste
- `GET /api/tests?athlete_id=:id` - Testes por atleta

### Relatórios
- `GET /api/reports` - Estatísticas gerais

## 🧪 Testes e Qualidade

```bash
# Executar linter
npm run lint

# Build de produção
npm run build
```

## 👨‍💻 Autor

Desenvolvido como projeto acadêmico para Aplicações Distribuídas.

## 📄 Licença

Este projeto está sob a licença MIT.
