# 📚 Guia de Migrations - Yenda Backend

## 🎯 O que são Migrations?

Migrations são scripts que criam e modificam a estrutura do banco de dados de forma controlada e versionada. Elas permitem:
- ✅ Versionar mudanças no schema do banco
- ✅ Compartilhar estrutura do banco entre desenvolvedores
- ✅ Fazer rollback de mudanças se necessário
- ✅ Manter histórico de alterações

---

## 📁 Estrutura das Migrations

Suas migrations estão em `src/migrations/` e seguem esta ordem:

1. `001-create-users.js` - Tabela de usuários
2. `002-create-store-categories.js` - Categorias de lojas
3. `003-create-stores.js` - Lojas
4. `004-create-product-categories.js` - Categorias de produtos
5. `005-create-products.js` - Produtos (com foreign keys)
6. `006-create-images.js` - Imagens

**Importante:** A ordem é crucial porque algumas tabelas dependem de outras (foreign keys).

---

## 🚀 Como Rodar as Migrations

### **Método 1: Usando npm script (Recomendado)**

```bash
npm run migrate
```

### **Método 2: Usando node diretamente**

```bash
node src/migrations/migrate.js
```

---

## ⚠️ ANTES DE EXECUTAR - Checklist

### ✅ 1. Verifique o arquivo `.env`

Certifique-se de que está configurado corretamente:

**Para SQLite (desenvolvimento):**
```env
DB_DIALECT=sqlite
DB_STORAGE=./database.db
```

**Para PostgreSQL (produção):**
```env
DB_DIALECT=postgres
DB_NAME=yenda
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_HOST=localhost
DB_PORT=5432
```

### ✅ 2. Banco de dados limpo

Se você já executou o servidor antes, o `sequelize.sync()` pode ter criado tabelas automaticamente. Você tem duas opções:

**Opção A - Começar do zero (APAGA DADOS):**
```bash
# Para SQLite
rm database.db

# Para PostgreSQL
psql -U postgres -c "DROP DATABASE yenda; CREATE DATABASE yenda;"
```

**Opção B - Manter dados existentes:**
Neste caso, as migrations vão falhar se as tabelas já existirem. Você precisaria criar migrations de alteração (ALTER TABLE) ao invés de criação.

### ✅ 3. Pare o servidor

Se o servidor estiver rodando, pare-o com `Ctrl+C` antes de executar as migrations.

---

## 📋 Passo a Passo Completo

### **Primeira vez executando migrations:**

```bash
# 1. Pare o servidor (se estiver rodando)
# Ctrl+C no terminal

# 2. Limpe o banco de dados (se necessário)
rm database.db

# 3. Execute as migrations
npm run migrate

# 4. Inicie o servidor novamente
npm run dev
```

### **O que vai acontecer:**

Quando você executar `npm run migrate`, verá algo assim no console:

```
Running migration: 001-create-users.js
Completed migration: 001-create-users.js
Running migration: 002-create-store-categories.js
Completed migration: 002-create-store-categories.js
Running migration: 003-create-stores.js
Completed migration: 003-create-stores.js
Running migration: 004-create-product-categories.js
Completed migration: 004-create-product-categories.js
Running migration: 005-create-products.js
Completed migration: 005-create-products.js
Running migration: 006-create-images.js
Completed migration: 006-create-images.js
All migrations completed successfully
```

---

## 🔄 Criando Novas Migrations

Quando você modificar um model, crie uma nova migration:

### **Exemplo: Adicionar coluna em uma tabela**

Crie um arquivo `007-add-column-to-users.js`:

```javascript
export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('users', 'nova_coluna', {
    type: Sequelize.STRING,
    allowNull: true,
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.removeColumn('users', 'nova_coluna');
}
```

### **Exemplo: Modificar coluna existente**

```javascript
export async function up(queryInterface, Sequelize) {
  await queryInterface.changeColumn('users', 'name', {
    type: Sequelize.STRING(100),
    allowNull: false,
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.changeColumn('users', 'name', {
    type: Sequelize.STRING,
    allowNull: false,
  });
}
```

---

## 🛠️ Comandos Úteis

### **Verificar se o banco está conectado:**
```bash
node -e "import('./src/config/database.js').then(({sequelize}) => sequelize.authenticate().then(() => console.log('✅ Conectado')).catch(e => console.log('❌ Erro:', e.message)))"
```

### **Ver tabelas criadas (SQLite):**
```bash
sqlite3 database.db ".tables"
```

### **Ver estrutura de uma tabela (SQLite):**
```bash
sqlite3 database.db ".schema users"
```

---

## ❌ Problemas Comuns

### **Erro: "table already exists"**

**Causa:** As tabelas já foram criadas pelo `sequelize.sync()` ou migrations anteriores.

**Solução:**
```bash
# Opção 1: Limpar o banco
rm database.db
npm run migrate

# Opção 2: Criar migrations de alteração ao invés de criação
```

### **Erro: "SQLITE_ERROR: no such table"**

**Causa:** Você está tentando usar o banco antes de rodar as migrations.

**Solução:**
```bash
npm run migrate
npm run dev
```

### **Erro: "Cannot find module"**

**Causa:** Caminho incorreto ou arquivo não existe.

**Solução:** Verifique se todos os arquivos de migration existem em `src/migrations/`.

---

## 📝 Boas Práticas

1. ✅ **Nunca modifique migrations já executadas** - Crie uma nova migration
2. ✅ **Sempre teste migrations localmente** antes de aplicar em produção
3. ✅ **Faça backup do banco** antes de rodar migrations em produção
4. ✅ **Use nomes descritivos** para arquivos de migration
5. ✅ **Implemente a função `down()`** para permitir rollback
6. ✅ **Não use `sequelize.sync()`** em produção - use apenas migrations

---

## 🎓 Próximos Passos

Depois de rodar as migrations com sucesso:

1. ✅ Verifique se todas as tabelas foram criadas
2. ✅ Teste suas rotas e controllers
3. ✅ Adicione dados de teste (seeds) se necessário
4. ✅ Configure migrations para ambiente de produção

---

## 📞 Ajuda

Se encontrar problemas:
1. Verifique os logs de erro
2. Confirme que o `.env` está correto
3. Certifique-se de que o banco está acessível
4. Verifique se não há conflitos de tabelas existentes
