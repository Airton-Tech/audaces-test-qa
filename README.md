# 🧪 Projeto Cypress - Testes Automatizados (Audaces)

Este projeto contém a automação de testes do site [SauceDemo](https://www.saucedemo.com) utilizando Cypress, com execução em múltiplos navegadores (Chrome e Edge) e geração de relatório único.
Os cenários de testes estão na pasta 

---

## ✅ Pré-requisitos

Certifique-se de ter instalado:

- [Node.js (recomendado LTS)](https://nodejs.org/)
- [Git](https://git-scm.com/)
- Navegadores:
  - Google Chrome
  - Microsoft Edge

---

## 🚀 Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/Airton-Tech/audaces-test-qa.git
cd audaces-test-qa
```

### 2. Instale as dependências

```bash
npm install
```

---

## ▶️ Executando os testes

Você pode executar os testes em diferentes navegadores e modos:

### 🔹 Executar em um único navegador:

```bash
# Chrome com interface
npm run test:chrome

# Chrome headless
npm run test:chrome:headless

# Edge com interface
npm run test:edge

# Edge headless
npm run test:edge:headless
```

### 🔸 Executar todos os testes (Chrome e Edge, com e sem interface) e gerar relatório único:

```bash
npm run test:all
```

---

## 📊 Relatório de Testes

Após a execução do comando `npm run test:all`, um **relatório consolidado** será gerado no caminho:

```
cypress/reports/html/index.html
```

Basta abrir esse arquivo no navegador para visualizar os testes realizados.

---

## 📁 Estrutura de pastas

```
cypress/
├── e2e/                  # Especificações dos testes
├── reports/              # Relatórios e arquivos .json gerados
│   └── html/             # Relatório final em HTML
├── support/              # Configurações globais dos testes
├── fixtures/             # Dados mockados (opcional)
```

---

## 🛠️ Tecnologias utilizadas

- [Cypress](https://www.cypress.io/)
- [Mochawesome](https://github.com/adamgruber/mochawesome)
- [Cypress Mochawesome Reporter](https://github.com/LironEr/cypress-mochawesome-reporter)

---

## 👨‍💻 Autor

### Airton França  - [linkedin.com/in/airtonsf](https://www.linkedin.com/in/airtonsf)