# ✅ Adaptação MySQL Completa - Resumo

## 🎯 O que foi feito

Todos os models e migrations foram adaptados para funcionar perfeitamente com MySQL, aproveitando recursos específicos do banco de dados.

---

## 📝 Arquivos Modificados

### **Migrations (6 arquivos)**

1. ✅ `001-create-users.js`
   - `street`: TEXT → VARCHAR(500)
   - Adicionado `ON UPDATE CURRENT_TIMESTAMP`

2. ✅ `002-create-store-categories.js`
   - Adicionado `ON UPDATE CURRENT_TIMESTAMP`

3. ✅ `003-create-stores.js`
   - `category`: TEXT → VARCHAR(255)
   - `nif`: STRING → VARCHAR(50)
   - `photo`: STRING → VARCHAR(500)
   - `latitude`: DECIMAL → DECIMAL(10, 8)
   - `longitude`: DECIMAL → DECIMAL(11, 8)
   - `email`: STRING → VARCHAR(255)
   - `address`: STRING → VARCHAR(500)
   - `password`: STRING → VARCHAR(255)
   - `whatsapp`: STRING → VARCHAR(20)
   - `number`: STRING → VARCHAR(20)
   - Adicionado `ON UPDATE CURRENT_TIMESTAMP`

4. ✅ `004-create-product-categories.js`
   - Adicionado `ON UPDATE CURRENT_TIMESTAMP`

5. ✅ `005-create-products.js`
   - `name`: STRING → VARCHAR(255)
   - `photo`: STRING → VARCHAR(500)
   - `store_id`: UUID → BIGINT (para consistência)
   - Adicionado `ON UPDATE CURRENT_TIMESTAMP`

6. ✅ `006-create-images.js`
   - `name`: STRING → VARCHAR(255)
   - `data`: Mantido como TEXT('long') para LONGTEXT
   - Adicionado `ON UPDATE CURRENT_TIMESTAMP`

### **Models (4 arquivos)**

1. ✅ `User.js`
   - `street`: TEXT → STRING(500)

2. ✅ `Store.js`
   - `category`: TEXT → STRING(255)
   - `nif`: STRING → STRING(50)
   - `photo`: STRING → STRING(500)
   - `latitude`: DECIMAL → DECIMAL(10, 8)
   - `longitude`: DECIMAL → DECIMAL(11, 8)
   - `email`: STRING → STRING(255)
   - `address`: STRING → STRING(500)
   - `password`: STRING → STRING(255)
   - `whatsapp`: STRING → STRING(20)
   - `number`: STRING → STRING(20)

3. ✅ `Product.js`
   - `name`: STRING → STRING(255)
   - `photo`: STRING → STRING(500)
   - `store_id`: UUID → BIGINT

4. ✅ `Image.js`
   - `name`: STRING → STRING(255)

### **Configuração**

5. ✅ `database.js`
   - Removido `sequelize.sync()` (conflita com migrations)

---

## 🆕 Recursos MySQL Implementados

### **1. ON UPDATE CURRENT_TIMESTAMP**
```sql
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
```
- Atualiza automaticamente o campo `updated_at` quando um registro é modificado
- Não disponível no SQLite

### **2. Tipos de Dados Específicos**

**VARCHAR com tamanhos otimizados:**
- `VARCHAR(20)` - Números de telefone
- `VARCHAR(50)` - NIF
- `VARCHAR(255)` - Nomes, emails, senhas hash
- `VARCHAR(500)` - Endereços, URLs de fotos

**DECIMAL com precisão:**
- `DECIMAL(10, 8)` - Latitude (permite -90.00000000 a 90.00000000)
- `DECIMAL(11, 8)` - Longitude (permite -180.00000000 a 180.00000000)
- `DECIMAL(10, 2)` - Preços (até 99.999.999,99)

**LONGTEXT:**
- Para armazenar imagens em base64 (até 4GB)

### **3. Foreign Keys com Comportamentos**
```sql
FOREIGN KEY (store_id) REFERENCES stores(id)
  ON UPDATE CASCADE    -- Atualiza automaticamente se o ID da store mudar
  ON DELETE SET NULL   -- Define como NULL se a store for deletada

FOREIGN KEY (category_id) REFERENCES product_categories(id)
  ON UPDATE CASCADE
  ON DELETE RESTRICT   -- Impede deletar categoria se houver produtos
```

### **4. Charset UTF8MB4**
- Suporte completo a emojis e caracteres especiais
- Configurado nas migrations e recomendado no setup

---

## 📚 Documentação Criada

1. **[MYSQL_SETUP.md](file:///Users/sabinojose/Documents/Projetos/yenda-backend/MYSQL_SETUP.md)**
   - Instalação do MySQL
   - Configuração inicial
   - Criação de usuário e banco
   - Troubleshooting
   - Comandos úteis
   - Configurações de performance
   - Segurança em produção

2. **[MIGRATIONS_GUIDE.md](file:///Users/sabinojose/Documents/Projetos/yenda-backend/MIGRATIONS_GUIDE.md)** (atualizado)
   - Instruções para MySQL e SQLite
   - Comandos para ambos os bancos
   - Link para o guia de setup do MySQL

---

## 🚀 Como Usar

### **Opção 1: MySQL (Recomendado)**

```bash
# 1. Instale o MySQL
brew install mysql
brew services start mysql

# 2. Configure o banco
mysql -u root -p
CREATE DATABASE yenda CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'yenda_user'@'localhost' IDENTIFIED BY 'sua_senha';
GRANT ALL PRIVILEGES ON yenda.* TO 'yenda_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;

# 3. Configure o .env
cat > .env << EOF
DB_DIALECT=mysql
DB_NAME=yenda
DB_USER=yenda_user
DB_PASS=sua_senha
DB_HOST=localhost
DB_PORT=3306
EOF

# 4. Execute as migrations
npm run migrate

# 5. Inicie o servidor
npm run dev
```

### **Opção 2: SQLite (Desenvolvimento)**

```bash
# 1. Configure o .env
cat > .env << EOF
DB_DIALECT=sqlite
DB_STORAGE=./database.db
EOF

# 2. Execute as migrations
npm run migrate

# 3. Inicie o servidor
npm run dev
```

> **⚠️ Nota:** Algumas features do MySQL (como `ON UPDATE CURRENT_TIMESTAMP`) não funcionam no SQLite, mas as migrations são compatíveis com ambos.

---

## ✅ Vantagens da Adaptação MySQL

1. **Performance**
   - Índices otimizados
   - Tipos de dados específicos economizam espaço
   - Foreign keys com integridade referencial

2. **Funcionalidades**
   - Atualização automática de timestamps
   - Cascata de updates/deletes
   - Suporte a transações ACID completas

3. **Escalabilidade**
   - Melhor para produção
   - Suporte a replicação
   - Melhor concorrência

4. **Compatibilidade**
   - Padrão da indústria
   - Fácil migração para serviços cloud (AWS RDS, Google Cloud SQL, etc.)

---

## 🔍 Verificação

Para verificar se tudo está funcionando:

```bash
# Teste a conexão
node -e "import('./src/config/database.js').then(({sequelize}) => sequelize.authenticate().then(() => console.log('✅ MySQL conectado!')).catch(e => console.log('❌ Erro:', e.message)))"

# Veja as tabelas
mysql -u yenda_user -p yenda -e "SHOW TABLES;"

# Veja a estrutura
mysql -u yenda_user -p yenda -e "DESCRIBE stores;"

# Veja os índices
mysql -u yenda_user -p yenda -e "SHOW INDEX FROM products;"

# Veja as foreign keys
mysql -u yenda_user -p yenda -e "SELECT TABLE_NAME, COLUMN_NAME, CONSTRAINT_NAME, REFERENCED_TABLE_NAME FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE WHERE REFERENCED_TABLE_SCHEMA = 'yenda';"
```

---

## 📊 Estrutura Final do Banco

```
yenda/
├── users
│   ├── id (BIGINT, PK, AUTO_INCREMENT)
│   ├── name (VARCHAR(255))
│   ├── email (VARCHAR(255), UNIQUE)
│   ├── street (VARCHAR(500))
│   └── ... (outros campos)
│
├── store_categories
│   ├── id (INT, PK, AUTO_INCREMENT)
│   └── name (VARCHAR(255))
│
├── stores
│   ├── id (BIGINT, PK, AUTO_INCREMENT)
│   ├── name (VARCHAR(255), UNIQUE)
│   ├── email (VARCHAR(255), UNIQUE)
│   ├── latitude (DECIMAL(10,8))
│   ├── longitude (DECIMAL(11,8))
│   └── ... (outros campos)
│
├── product_categories
│   ├── id (INT, PK, AUTO_INCREMENT)
│   └── name (VARCHAR(255))
│
├── products
│   ├── id (BIGINT, PK, AUTO_INCREMENT)
│   ├── name (VARCHAR(255))
│   ├── price (DECIMAL(10,2))
│   ├── store_id (BIGINT, FK → stores.id)
│   ├── category_id (INT, FK → product_categories.id)
│   └── ... (outros campos)
│
└── Images
    ├── id (INT, PK, AUTO_INCREMENT)
    ├── name (VARCHAR(255))
    └── data (LONGTEXT)
```

---

## 🎓 Próximos Passos Recomendados

1. ✅ Configure o MySQL conforme [MYSQL_SETUP.md](file:///Users/sabinojose/Documents/Projetos/yenda-backend/MYSQL_SETUP.md)
2. ✅ Execute as migrations
3. ✅ Teste todas as rotas da API
4. ✅ Crie seeds para dados iniciais
5. ✅ Configure backups automáticos
6. ✅ Implemente monitoring de queries lentas
7. ✅ Configure SSL/TLS para produção

---

## 📞 Suporte

Se encontrar problemas:
1. Consulte [MYSQL_SETUP.md](file:///Users/sabinojose/Documents/Projetos/yenda-backend/MYSQL_SETUP.md) para troubleshooting
2. Consulte [MIGRATIONS_GUIDE.md](file:///Users/sabinojose/Documents/Projetos/yenda-backend/MIGRATIONS_GUIDE.md) para problemas com migrations
3. Verifique os logs do MySQL: `tail -f /usr/local/var/mysql/*.err` (macOS)
