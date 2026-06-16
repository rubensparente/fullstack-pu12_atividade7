### 🚀 API de Categorias e Produtos

API RESTful com Express.js, TypeScript e Zod para validação de dados.

### 🛠️ Tecnologias

- Node.js + Express.js
- TypeScript
- Zod (validação)
- UUID para IDs

#### 📁 Estrutura
 #### controllers -> Lógica de negócio
 #### routers -> Rotas da API
 #### schemas -> Validações Zod
#### middlewares -> Middleware de validação
#### server.ts -> Entry point

#### 📡 Endpoints

#### Categorias (`/category`)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/category?page=1&size=10` | Listar categorias |
| GET | `/category/:id` | Buscar categoria |
| POST | `/category` | Criar categoria |
| PUT | `/category/:id` | Atualizar categoria |
| DELETE | `/category/:id` | Deletar categoria |

#### Produtos (`/products`)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/products?category=uuid` | Listar produtos |
| GET | `/products/:id` | Buscar produto |
| POST | `/products` | Criar produto |
| PUT | `/products/:id` | Atualizar produto |
| DELETE | `/products/:id` | Deletar produto |

#### ✅ Regras de Validação

#### Categoria
- `name`: string, 3-100 caracteres
- `description`: string opcional

### Produto
- `name`: string, mínimo 3 caracteres
- `price`: número positivo
- `categoryId`: UUID válido

#### 🚀 Como Executar

#### Instalar dependências
- npm install

#### Desenvolvimento
- npm run dev

#### Produção
- npm run build
- npm start

#### Servidor: http://localhost:3000

#### 📝 Exemplos
#### Criar categoria
curl -X POST http://localhost:3000/category \
  -H "Content-Type: application/json" \
  -d '{"name": "Eletrônicos"}'
#### Criar produto
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Smartphone", "price": 1999.99, "categoryId": "uuid-aqui"}'
#### Listar produtos por categoria
curl "http://localhost:3000/products?category=uuid-aqui"
📊 Status Codes
200 - Sucesso

201 - Criado

204 - Deletado (sem conteúdo)

400 - Erro de validação

404 - Não encontrado

🎯 Arquitetura
Schemas: Definem regras de validação

Middleware: Valida dados antes do controller

Controllers: Implementam a lógica de negócio

Routers: Definem rotas e aplicam middlewares
