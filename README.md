# 📦 Sistema de Estoque em Node.js (CLI)

> Sistema de gerenciamento de estoque desenvolvido em Node.js, executado diretamente no terminal, com operações de CRUD (Criar, Ler, Atualizar e Deletar).

---

## 📸 Demonstração do Projeto

<img width="1439" height="2477" alt="1000312982" src="https://github.com/user-attachments/assets/9f618c7c-359d-48b7-90f4-5d78fb27c5fe" />

![Preview do Sistema](./imagens/preview.png)

> *Adicione aqui uma captura de tela do sistema rodando no terminal.*

---

## 🎯 Objetivo

Este projeto tem como objetivo praticar:

- Lógica de programação
- Manipulação de arrays e objetos
- Funções assíncronas em JavaScript
- Uso do módulo `readline`
- Estruturação de sistemas em CLI

---

## ⚙️ Funcionalidades

✔️ Listar todos os produtos do estoque  
✔️ Adicionar novos produtos  
✔️ Remover produtos existentes  
✔️ Editar nome, valor ou quantidade  
✔️ Buscar produtos por filtros  

---

## 🧠 Como o sistema funciona

Os produtos são armazenados em memória usando um array de objetos:

```js
{
  produto: "Nome",
  valor: 0,
  quantidade: 0
}
