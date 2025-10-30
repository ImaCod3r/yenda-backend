# Yenda Backend API

Uma API RESTful para gerenciamento de lojas e produtos desenvolvida com Node.js, Express e Sequelize.

## 📋 Visão Geral

A API Yenda é um sistema de gerenciamento de lojas e produtos que permite:
- Autenticação de usuários com JWT
- Gerenciamento de lojas e seus administradores
- CRUD de produtos por loja
- Sistema de roles (usuário/admin)
- Middleware de autorização para operações específicas

## 🏗️ Arquitetura

### Tecnologias Utilizadas
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Sequelize** - ORM para banco de dados
- **SQLite/PostgreSQL** - Banco de dados
- **JWT** - Autenticação
- **bcrypt** - Criptografia de senhas
- **CORS** - Cross-origin resource sharing

### Estrutura do Projeto
```
src/
├── config/
│   └── database.js          # Configuração do banco de dados
├── controllers/             # Lógica de negócio
│   ├── authController.js    # Autenticação
│   ├── userController.js    # Usuários
│   ├── storeController.js   # Lojas
│   └── productController.js # Produtos
├── middlewares/             # Middlewares de autenticação
│   ├── authMiddleware.js    # Verificação JWT
│   └── storeManagerMiddleware.js # Verificação de gerente
├── models/                  # Modelos do banco de dados
│   ├── User.js
│   ├── Store.js
│   ├── Product.js
│   ├── StoreManager.js
│   ├── ProductCategory.js
│   └── StoreCategory.js
├── routes/                  # Definição das rotas
│   ├── authRoutes.js
│   ├── userRoutes.js
│   ├── storeRoutes.js
│   └── productRoutes.js
├── migrations/
│   └── migrate.js           # Migrações do banco
├── app.js                   # Configuração do Express
└── server.js               # Servidor principal
```

## 🗄️ Modelo de Dados

### Entidades Principais

#### User (Usuário)
- `id` - ID único (BIGINT)
- `name` - Nome do usuário
- `email` - Email único
- `password` - Senha criptografada
- `number` - Número de telefone
- `photo` - Foto do usuário
- `role` - Role do usuário (user/admin)
- `country`, `province`, `street` - Endereço
- `created_at`, `updated_at` - Timestamps

#### Store (Loja)
- `id` - ID único (UUID)
- `name` - Nome da loja
- `description` - Descrição
- `category` - Categoria da loja
- `email` - Email único da loja
- `password` - Senha da loja
- `nif` - Número de identificação fiscal
- `photo` - Foto da loja
- `latitude`, `longitude` - Coordenadas GPS
- `address` - Endereço físico
- `whatsapp`, `number` - Contatos
- `isVerified` - Status de verificação
- `created_at`, `updated_at` - Timestamps

#### Product (Produto)
- `id` - ID único (BIGINT)
- `name` - Nome do produto
- `description` - Descrição
- `photo` - Foto do produto
- `price` - Preço (DECIMAL)
- `shareable` - Se pode ser compartilhado
- `store_id` - ID da loja (FK)
- `category_id` - ID da categoria (FK)
- `createdAt`, `updatedAt` - Timestamps

#### StoreManager (Gerente de Loja)
- `user_id` - ID do usuário (FK)
- `store_id` - ID da loja (FK)
- Relaciona usuários com lojas que gerenciam

### Relacionamentos
- **Store** → **Product** (1:N) - Uma loja tem muitos produtos
- **User** → **StoreManager** (1:N) - Um usuário pode gerenciar várias lojas
- **Store** → **StoreManager** (1:N) - Uma loja pode ter vários gerentes
- **ProductCategory** → **Product** (1:N) - Uma categoria tem muitos produtos
- **StoreCategory** → **Store** (1:N) - Uma categoria tem muitas lojas

## 🔐 Sistema de Autenticação

### Autenticação JWT
- Tokens JWT com expiração de 7 dias
- Armazenamento seguro em cookies HTTP-only
- Middleware `authMiddleware` verifica tokens automaticamente

### Roles e Permissões
- **user**: Usuário comum
- **admin**: Administrador geral (pode criar lojas, gerenciar gerentes)

### Middleware de Autorização
- `authMiddleware`: Verifica se usuário está autenticado
- `storeManagerMiddleware`: Verifica se usuário é gerente da loja específica

## 🛠️ Endpoints da API

### Base URL
```
http://localhost:3000/api
```

### 🔑 Autenticação (`/api/auth`)

#### POST `/register`
Registra um novo usuário
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123",
  "number": "+5511999999999",
  "country": "Brasil",
  "province": "São Paulo",
  "street": "Rua das Flores, 123"
}
```

#### POST `/login`
Autentica usuário
```json
{
  "email": "joao@email.com",
  "password": "senha123"
}
```

#### POST `/logout`
Desloga usuário (limpa cookie)

#### GET `/profile`
Retorna perfil do usuário autenticado (requer autenticação)

### 👥 Usuários (`/api/users`)

#### GET `/`
Lista todos os usuários (público)

#### GET `/:id`
Busca usuário por ID (público)

#### PUT `/:id`
Atualiza usuário (requer autenticação + ser dono ou admin)

#### DELETE `/:id`
Remove usuário (público)

### 🏪 Lojas (`/api/stores`)

**Todas as rotas requerem autenticação**

#### GET `/`
Lista todas as lojas

#### GET `/:storeId`
Busca loja por ID

#### GET `/:storeId/managers`
Lista gerentes da loja

#### POST `/`
Cria nova loja (apenas admin)
```json
{
  "name": "Loja Exemplo",
  "description": "Descrição da loja",
  "category": "Eletrônicos",
  "email": "loja@email.com",
  "password": "senha123",
  "address": "Rua das Lojas, 456",
  "latitude": -23.5505,
  "longitude": -46.6333
}
```

#### POST `/:storeId/managers`
Adiciona gerente à loja (apenas admin)
```json
{
  "user_id": 1
}
```

#### DELETE `/:storeId/managers/:userId`
Remove gerente da loja (apenas admin)
- Query param `?deleteStore=true` para deletar a loja inteira

### 📦 Produtos (`/api/products`)

#### GET `/`
Lista todos os produtos (público)

#### GET `/stores/:storeId`
Lista produtos de uma loja específica

#### POST `/stores/:storeId`
Cria produto para loja (requer ser gerente da loja)
```json
{
  "name": "Produto Exemplo",
  "description": "Descrição do produto",
  "price": 99.99,
  "category_id": 1,
  "photo": "url_da_foto",
  "shareable": true
}
```

#### PUT `/:id`
Atualiza produto (requer ser gerente da loja)

#### DELETE `/:id`
Remove produto (requer ser gerente da loja)

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 14+)
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone https://github.com/ImaCod3r/yenda-backend.git

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

### Configuração do Banco de Dados

#### SQLite (Desenvolvimento)
```env
DB_DIALECT=sqlite
DB_STORAGE=./database.db
```

#### PostgreSQL (Produção)
```env
DB_DIALECT=postgres
DB_NAME=yenda_db
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_HOST=localhost
DB_PORT=5432
```

### Executar Migrações
```bash
npm run migrate
```

### Executar o Servidor
```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```

O servidor estará disponível em `http://localhost:3000`

## 🔧 Scripts Disponíveis

- `npm run dev` - Executa com nodemon para desenvolvimento
- `npm run migrate` - Executa migrações do banco de dados
- `npm test` - Executa testes (ainda não implementado)

## 📝 Variáveis de Ambiente

```env
# Servidor
PORT=3000
NODE_ENV=development

# Banco de Dados
DB_DIALECT=sqlite
DB_STORAGE=./database.db

# JWT
JWT_SECRET=sua_chave_secreta_jwt

# CORS
CORS_ORIGIN=*
```

## 🔒 Segurança

- Senhas são criptografadas com bcrypt
- Tokens JWT com expiração automática
- Cookies HTTP-only para armazenamento seguro
- Middleware de autorização em rotas sensíveis
- Validação de entrada em todos os endpoints
- CORS configurado para controle de origem

## 📊 Status Codes

- `200` - Sucesso
- `201` - Criado com sucesso
- `204` - Sem conteúdo (deletado)
- `400` - Erro de validação
- `401` - Não autorizado
- `403` - Acesso negado
- `404` - Não encontrado
- `500` - Erro interno do servidor

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

Desenvolvido por [ImaCod3r](https://github.com/ImaCod3r)

---

Para mais informações ou dúvidas, abra uma issue no repositório.