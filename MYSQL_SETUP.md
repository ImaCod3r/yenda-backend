# 🔧 Configuração MySQL - Yenda Backend

## 📋 Pré-requisitos

Antes de começar, você precisa ter o MySQL instalado:

### **macOS (usando Homebrew)**
```bash
brew install mysql
brew services start mysql
```

### **Linux (Ubuntu/Debian)**
```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
```

### **Windows**
Baixe e instale o MySQL Community Server de: https://dev.mysql.com/downloads/mysql/

---

## 🚀 Configuração Inicial do MySQL

### **1. Acesse o MySQL**
```bash
mysql -u root -p
```

### **2. Crie o banco de dados**
```sql
CREATE DATABASE yenda CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### **3. Crie um usuário (opcional, mas recomendado)**
```sql
CREATE USER 'yenda_user'@'localhost' IDENTIFIED BY 'sua_senha_segura';
GRANT ALL PRIVILEGES ON yenda.* TO 'yenda_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## ⚙️ Configuração do Projeto

### **1. Instale o driver MySQL**

O projeto já tem o `mysql2` como dependência. Se não tiver, instale:

```bash
npm install mysql2
```

### **2. Configure o arquivo `.env`**

Atualize seu arquivo `.env` com as credenciais do MySQL:

```env
# Database Configuration
DB_DIALECT=mysql
DB_NAME=yenda
DB_USER=yenda_user
DB_PASS=sua_senha_segura
DB_HOST=localhost
DB_PORT=3306

# Outras configurações...
PORT=3000
JWT_SECRET=seu_jwt_secret_aqui
```

### **3. Verifique o arquivo `database.js`**

O arquivo `/src/config/database.js` já está configurado para suportar MySQL:

```javascript
if (process.env.DB_DIALECT === "mysql") {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: "mysql",
      logging: false,
    }
  );
}
```

---

## 🗄️ Execute as Migrations

Agora que o MySQL está configurado, execute as migrations:

```bash
# 1. Limpe o banco (se necessário)
mysql -u yenda_user -p yenda -e "DROP DATABASE yenda; CREATE DATABASE yenda CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# 2. Execute as migrations
npm run migrate

# 3. Inicie o servidor
npm run dev
```

---

## ✅ Verificação

### **Verificar se as tabelas foram criadas:**

```bash
mysql -u yenda_user -p yenda -e "SHOW TABLES;"
```

Você deve ver:
```
+---------------------------+
| Tables_in_yenda           |
+---------------------------+
| Images                    |
| product_categories        |
| products                  |
| store_categories          |
| stores                    |
| users                     |
+---------------------------+
```

### **Ver estrutura de uma tabela:**

```bash
mysql -u yenda_user -p yenda -e "DESCRIBE users;"
```

### **Ver foreign keys:**

```bash
mysql -u yenda_user -p yenda -e "SELECT TABLE_NAME, COLUMN_NAME, CONSTRAINT_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE WHERE REFERENCED_TABLE_SCHEMA = 'yenda';"
```

---

## 🔄 Diferenças MySQL vs SQLite

As migrations foram adaptadas para aproveitar recursos do MySQL:

### **1. ON UPDATE CURRENT_TIMESTAMP**
```sql
-- MySQL suporta atualização automática de timestamps
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
```

### **2. Tipos de dados mais específicos**
```sql
-- VARCHAR com tamanhos específicos
name VARCHAR(255)
photo VARCHAR(500)
street VARCHAR(500)

-- DECIMAL com precisão
latitude DECIMAL(10, 8)
longitude DECIMAL(11, 8)
price DECIMAL(10, 2)

-- LONGTEXT para dados grandes
data LONGTEXT
```

### **3. Foreign Keys com CASCADE**
```sql
FOREIGN KEY (store_id) REFERENCES stores(id) 
  ON UPDATE CASCADE 
  ON DELETE SET NULL
```

### **4. Charset UTF8MB4**
Suporta emojis e caracteres especiais completos.

---

## 🛠️ Comandos Úteis MySQL

### **Backup do banco:**
```bash
mysqldump -u yenda_user -p yenda > backup_yenda.sql
```

### **Restaurar backup:**
```bash
mysql -u yenda_user -p yenda < backup_yenda.sql
```

### **Ver tamanho do banco:**
```sql
SELECT 
  table_schema AS 'Database',
  ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS 'Size (MB)'
FROM information_schema.tables
WHERE table_schema = 'yenda'
GROUP BY table_schema;
```

### **Ver índices de uma tabela:**
```sql
SHOW INDEX FROM products;
```

### **Otimizar tabelas:**
```sql
OPTIMIZE TABLE users, stores, products;
```

---

## ⚠️ Problemas Comuns

### **Erro: "Access denied for user"**

**Solução:**
```bash
# Verifique as credenciais no .env
# Ou recrie o usuário:
mysql -u root -p
DROP USER 'yenda_user'@'localhost';
CREATE USER 'yenda_user'@'localhost' IDENTIFIED BY 'nova_senha';
GRANT ALL PRIVILEGES ON yenda.* TO 'yenda_user'@'localhost';
FLUSH PRIVILEGES;
```

### **Erro: "Unknown database 'yenda'"**

**Solução:**
```bash
mysql -u root -p -e "CREATE DATABASE yenda CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

### **Erro: "Client does not support authentication protocol"**

**Solução (MySQL 8.0+):**
```sql
ALTER USER 'yenda_user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'sua_senha';
FLUSH PRIVILEGES;
```

### **Erro de conexão no macOS**

**Solução:**
```bash
# Verifique se o MySQL está rodando
brew services list

# Inicie o MySQL se necessário
brew services start mysql
```

---

## 🔒 Segurança em Produção

### **1. Use senhas fortes**
```bash
# Gere uma senha segura
openssl rand -base64 32
```

### **2. Limite permissões do usuário**
```sql
-- Em produção, use permissões específicas
GRANT SELECT, INSERT, UPDATE, DELETE ON yenda.* TO 'yenda_user'@'localhost';
```

### **3. Configure SSL/TLS**
```javascript
// Em database.js para produção
dialectOptions: {
  ssl: {
    require: true,
    rejectUnauthorized: true
  }
}
```

### **4. Use variáveis de ambiente**
Nunca commite o arquivo `.env` com credenciais reais!

---

## 📊 Performance

### **Configurações recomendadas para MySQL**

Adicione ao seu `my.cnf` ou `my.ini`:

```ini
[mysqld]
# InnoDB settings
innodb_buffer_pool_size = 1G
innodb_log_file_size = 256M
innodb_flush_log_at_trx_commit = 2

# Query cache (MySQL 5.7)
query_cache_type = 1
query_cache_size = 64M

# Connection settings
max_connections = 200
```

---

## 🎓 Próximos Passos

1. ✅ Configure backups automáticos
2. ✅ Implemente seeds para dados iniciais
3. ✅ Configure replicação (se necessário)
4. ✅ Monitore performance com `EXPLAIN` nas queries
5. ✅ Configure logs de slow queries

---

## 📞 Recursos Adicionais

- [Documentação MySQL](https://dev.mysql.com/doc/)
- [Sequelize MySQL Dialect](https://sequelize.org/docs/v6/other-topics/dialect-specific-things/#mysql)
- [MySQL Workbench](https://www.mysql.com/products/workbench/) - GUI para gerenciar o banco
