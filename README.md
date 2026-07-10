# 📝 TODO API

Uma API RESTful para gerenciamento de tarefas com autenticação segura de usuários, e sistema de metas e progresso desenvolvida em TypeScript com Express.js e Supabase.

---

## 👥 Sobre o Projeto

Este é um projeto colaborativo desenvolvido por:
- **[Pedro Rossi Dev](https://github.com/pedrohrdev)** (@pedrohrdev)
- **[Moisés Figueiredo](https://github.com/devmoisesz)** (@devmoisesz)

---

## ✅ O que já está feito

### Autenticação & Usuários
- ✅ **Registro de usuários** (`POST /users/register`)
  - Validação de email duplicado
  - Hash seguro de senhas com bcrypt
  - Armazenamento em banco de dados Supabase

- ✅ **Login de usuários** (`POST /users/login`)
  - Autenticação por email e senha
  - Geração de JWT tokens
  - Retorno de dados do usuário (sem password_hash)

- ✅ **Camada de Serviço**
  - Lógica de negócio isolada e reutilizável
  - Tratamento centralizado de erros
  - Classe AppError personalizada

### CRUD de Tarefas
- ✅ **Operações de tarefas**
  - `GET /tasks` - Listar todas as tarefas ativas do usuário
  - `POST /tasks` - Criar nova tarefa
  - `PUT /tasks/:id` - Atualizar tarefa
  - `DELETE /tasks/:id` - Deletar tarefa

### Middleware de Autenticação
- ✅ **Proteção de rotas**
  - Validação de JWT em rotas protegidas
  - Associação de tarefas ao usuário autenticado
  - Verificação segura de tokens

### Infraestrutura & Boas Práticas
- ✅ **Estrutura em camadas**
  - Controllers (requisições HTTP)
  - Services (lógica de negócio)
  - Repository (acesso a dados)
  - Errors (tratamento de erros)

- ✅ **Middleware global**
  - Error handler centralizado
  - Validação de requisições
  - Autenticação JWT

- ✅ **Supabase Integration**
  - Conexão configurável por variáveis de ambiente
  - Health check endpoint (`GET /health`)

- ✅ **Segurança**
  - Senhas hasheadas com bcrypt
  - JWT para autenticação
  - Variáveis de ambiente para configurações sensíveis

---

## 🚧 O que falta fazer

### Funcionalidades Avançadas (TODO)
- ⏳ **Endpoints relacionados**
  - Marcar tarefa como concluída
  - Filtrar tarefas por status
  - Paginação de tarefas

### Melhorias & Testes
- ⏳ Testes unitários
- ⏳ Testes de integração
- ⏳ Validação de entrada com bibliotecas como Joi ou Zod
- ⏳ Rate limiting
- ⏳ Documentação Swagger/OpenAPI
- ⏳ CORS configuration

---

## 🚀 Como Rodar

### Pré-requisitos
- **Node.js** v18+ instalado
- **npm** ou **yarn**
- Conta no **Supabase** (crie uma em [supabase.com](https://supabase.com))

### 1. Clonar o repositório

```bash
git clone https://github.com/pedrohrdev/todo-api.git
cd todo-api
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto baseado em `.env.example`:

```bash
cp .env.example .env
```

Preencha as variáveis de ambiente:

```env
# Supabase Configuration
SUPABASE_URL=sua_url_supabase_aqui
SUPABASE_ANON_KEY=sua_chave_supabase_aqui

# Server Configuration
PORT=3000

# JWT Configuration
JWT_SECRET=sua_chave_secreta_jwt_aqui
```

#### Como obter as credenciais do Supabase:

1. Acesse [supabase.com](https://supabase.com) e faça login
2. Crie um novo projeto
3. Vá para **Settings > API** e copie:
   - Project URL → `SUPABASE_URL`
   - anon public key → `SUPABASE_ANON_KEY`

### 4. Configurar banco de dados

As tabelas necessárias devem existir no Supabase:

#### Tabela `users`
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Tabela `tasks`
```sql
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5. Executar em desenvolvimento

Com **nodemon** (recarrega automaticamente):

```bash
npm run dev
```

O servidor iniciará em `http://localhost:3000`

### 6. Build para produção

```bash
npm run build
```

Isso compilará os arquivos TypeScript para a pasta `dist/`.

### 7. Executar em produção

```bash
npm start
```

---

## 📚 Endpoints Disponíveis

### Autenticação

#### Registrar usuário
```http
POST /users/register
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "senha123"
}
```

**Resposta (201)**
```json
{
  "id": "uuid-do-usuario",
  "email": "usuario@example.com",
  "token": "jwt_token_aqui"
}
```

#### Fazer login
```http
POST /users/login
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "senha123"
}
```

**Resposta (200)**
```json
{
  "id": "uuid-do-usuario",
  "email": "usuario@example.com",
  "token": "jwt_token_aqui"
}
```

### Tarefas (Autenticado)

#### Listar todas as tarefas
```http
GET /tasks
Authorization: Bearer {token}
```

**Resposta (200)**
```json
[
  {
    "id": "uuid-da-tarefa",
    "user_id": "uuid-do-usuario",
    "title": "Minha primeira tarefa",
    "description": "Descrição da tarefa",
    "is_active": true,
    "created_at": "2026-07-10T10:00:00Z",
    "updated_at": "2026-07-10T10:00:00Z"
  }
]
```

#### Criar nova tarefa
```http
POST /tasks
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Nova tarefa",
  "description": "Descrição da tarefa"
}
```

**Resposta (201)**
```json
{
  "id": "uuid-da-tarefa",
  "user_id": "uuid-do-usuario",
  "title": "Nova tarefa",
  "description": "Descrição da tarefa",
  "is_active": true,
  "created_at": "2026-07-10T10:00:00Z",
  "updated_at": "2026-07-10T10:00:00Z"
}
```

#### Atualizar tarefa
```http
PUT /tasks/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Tarefa atualizada",
  "description": "Nova descrição",
  "is_active": true
}
```

**Resposta (200)**
```json
{
  "id": "uuid-da-tarefa",
  "user_id": "uuid-do-usuario",
  "title": "Tarefa atualizada",
  "description": "Nova descrição",
  "is_active": true,
  "created_at": "2026-07-10T10:00:00Z",
  "updated_at": "2026-07-10T10:30:00Z"
}
```

#### Deletar tarefa
```http
DELETE /tasks/:id
Authorization: Bearer {token}
```

**Resposta (204 No Content)**

### Health Check

```http
GET /health
```

**Resposta (200)**
```json
{
  "ok": true,
  "data": {
    "count": 5
  }
}
```

---

## 📁 Estrutura do Projeto

```
src/
├── controllers/
│   ├── users.controllers.ts       # Handlers HTTP de usuários
│   └── tasks.controllers.ts       # Handlers HTTP de tarefas
├── routes/
│   ├── users.routes.ts            # Rotas de usuários
│   └── tasks.routes.ts            # Rotas de tarefas
├── services/
│   ├── users.service.ts           # Lógica de negócio de usuários
│   └── tasks.service.ts           # Lógica de negócio de tarefas
├── repository/
│   ├── users.repository.ts        # Acesso a dados de usuários
│   └── tasks.repository.ts        # Acesso a dados de tarefas
├── middleware/
│   └── auth.middleware.ts         # Middleware de autenticação JWT
├── lib/
│   └── supabase.ts                # Configuração Supabase
├── errors/
│   └── AppError.ts                # Classe de erro customizada
└── server.ts                       # Servidor principal
```

---

## 🛠 Scripts Disponíveis

```bash
npm run dev      # Inicia em modo desenvolvimento (com hot-reload)
npm run build    # Compila TypeScript para JavaScript
npm start        # Executa a versão compilada
```

---

## 🔐 Variáveis de Ambiente

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `SUPABASE_URL` | URL do projeto Supabase | `https://xxxxx.supabase.co` |
| `SUPABASE_ANON_KEY` | Chave anônima do Supabase | `eyJhbGc...` |
| `PORT` | Porta do servidor | `3000` |
| `JWT_SECRET` | Chave secreta para JWT | `seu_segredo_muito_seguro` |

---

## 📦 Dependências

### Production
- **express** - Framework web
- **@supabase/supabase-js** - Cliente Supabase
- **bcrypt** - Hash de senhas
- **jsonwebtoken** - Geração e validação de JWT
- **dotenv** - Carregamento de variáveis de ambiente

### Development
- **typescript** - Suporte a TypeScript
- **ts-node** - Execução de TypeScript direto
- **nodemon** - Auto-reload em desenvolvimento
- **@types/*** - Type definitions

---

## 🤝 Contribuindo

Como este é um projeto em dupla, para contribuir:

1. Crie uma branch para sua feature: `git checkout -b feature/nome-da-feature`
2. Faça suas alterações e commit: `git commit -m "feat: descrição"`
3. Envie para a branch: `git push origin feature/nome-da-feature`
4. Abra um Pull Request

---

## 📝 Roadmap

- [x] Implementar endpoints CRUD completos de tarefas
- [x] Adicionar middleware de autenticação JWT
- [ ] Implementar testes unitários e de integração
- [ ] Adicionar validação de dados com Zod/Joi
- [ ] Configurar CORS
- [ ] Documentação Swagger
- [ ] Deploy em produção

---

## 📄 Licença

Este projeto está licenciado sob a MIT License.

---

## 📞 Contato

- **Pedro Rossi Dev** - [@pedrohrdev](https://github.com/pedrohrdev)
- **Moisés Figueiredo** - [@devmoisesz](https://github.com/devmoisesz)

---

**Última atualização:** Julho 2026
