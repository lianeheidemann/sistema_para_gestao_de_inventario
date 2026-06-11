const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// ================= CORES =================

const cores = {
    reset: "\x1b[0m",
    negrito: "\x1b[1m",
    verde: "\x1b[32m",
    vermelho: "\x1b[31m",
    amarelo: "\x1b[33m",
    azul: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    branco: "\x1b[37m"
};

// ================= ESTOQUE =================

let itensDoEstoque = [
    { produto: "Top", valor: 60, quantidade: 46 },
    { produto: "Croped", valor: 80, quantidade: 30 },
    { produto: "Calça Leg", valor: 80, quantidade: 9 }
];

// ================= PROMPT =================

function perguntar(texto) {
    return new Promise(resolve => {
        rl.question(texto, resposta => {
            resolve(resposta);
        });
    });
}

// ================= MENU =================

function exibirMenu() {
    console.clear();

    console.log(`
${cores.cyan}╔══════════════════════════════════════════════════════╗
║                SISTEMA DE ESTOQUE                   ║
╚══════════════════════════════════════════════════════╝${cores.reset}

${cores.verde}[1]${cores.reset} 📦 Exibir Estoque Completo
${cores.verde}[2]${cores.reset} ➕ Adicionar Item
${cores.verde}[3]${cores.reset} 🗑️  Remover Produto
${cores.verde}[4]${cores.reset} ✏️  Editar Produto
${cores.verde}[5]${cores.reset} 🔍 Buscar Item
${cores.verde}[6]${cores.reset} 🚪 Sair
`);
}

async function menu() {

    let continuar = true;

    while (continuar) {

        exibirMenu();

        let opcao = await perguntar(
            `${cores.verde}➜ Escolha uma opção:${cores.reset} `
        );

        switch (opcao) {

            case "1":
                printArray();
                await perguntar("\nPressione ENTER para continuar...");
                break;

            case "2":
                await addItemNoEstoque();
                break;

            case "3":
                await removerItemNoEstoque();
                break;

            case "4":
                await edicaoDeItens();
                break;

            case "5":
                await buscarItem();
                break;

            case "6":
                console.log(
                    `${cores.vermelho}\nSistema finalizado.${cores.reset}`
                );
                continuar = false;
                rl.close();
                break;

            default:
                console.log(
                    `${cores.vermelho}Opção inválida!${cores.reset}`
                );
                await perguntar("\nPressione ENTER...");
        }
    }
}

// ================= EXIBIR ESTOQUE =================

function printArray() {

    console.clear();

    if (itensDoEstoque.length === 0) {
        console.log(
            `${cores.vermelho}⚠ Estoque vazio.${cores.reset}`
        );
        return;
    }

    console.log(`
${cores.cyan}📋 ESTOQUE ATUAL${cores.reset}
────────────────────────────────────────────────────────────
`);

    console.log(
        `${cores.magenta}#   Produto                Preço        Quantidade${cores.reset}`
    );

    console.log(
        "────────────────────────────────────────────────────────────"
    );

    itensDoEstoque.forEach((item, i) => {

        const numero = String(i + 1).padEnd(4);
        const produto = item.produto.padEnd(22);
        const preco = (`R$${item.valor}`).padEnd(13);

        console.log(
            `${cores.verde}${numero}${cores.reset}` +
            `${produto}` +
            `${cores.amarelo}${preco}${cores.reset}` +
            `${cores.cyan}${item.quantidade}${cores.reset}`
        );
    });

    console.log(
        "\n────────────────────────────────────────────────────────────"
    );
}

// ================= ADICIONAR =================

async function addItemNoEstoque() {

    console.clear();

    console.log(
        `${cores.cyan}\n➕ CADASTRO DE PRODUTO\n${cores.reset}`
    );

    let produto = await perguntar(
        `${cores.cyan}🏷 Nome do Produto:${cores.reset} `
    );

    let valor = await perguntar(
        `${cores.amarelo}💰 Valor:${cores.reset} `
    );

    let quantidade = await perguntar(
        `${cores.verde}📦 Quantidade:${cores.reset} `
    );

    itensDoEstoque.push({
        produto,
        valor: Number(valor),
        quantidade: Number(quantidade)
    });

    console.log(
        `${cores.verde}\n✔ Produto cadastrado com sucesso!${cores.reset}`
    );

    await perguntar("\nPressione ENTER...");
}

// ================= REMOVER =================

async function removerItemNoEstoque() {

    console.clear();

    printArray();

    let removerProduto = await perguntar(
        `\n${cores.vermelho}🗑 Produto para remover:${cores.reset} `
    );

    const index = itensDoEstoque.findIndex(
        item => item.produto.toLowerCase() === removerProduto.toLowerCase()
    );

    if (index !== -1) {

        itensDoEstoque.splice(index, 1);

        console.log(
            `${cores.verde}\n✔ Produto removido com sucesso!${cores.reset}`
        );

    } else {

        console.log(
            `${cores.vermelho}\n✖ Produto não encontrado.${cores.reset}`
        );
    }

    await perguntar("\nPressione ENTER...");
}

// ================= EDITAR =================

async function edicaoDeItens() {

    console.clear();

    printArray();

    let nome = await perguntar(
        `\n${cores.magenta}✏ Produto para editar:${cores.reset} `
    );

    let index = itensDoEstoque.findIndex(
        item => item.produto.toLowerCase() === nome.toLowerCase()
    );

    if (index === -1) {

        console.log(
            `${cores.vermelho}\nProduto não encontrado.${cores.reset}`
        );

        await perguntar("\nPressione ENTER...");
        return;
    }

    let editar = await perguntar(`
1 → Nome
2 → Valor
3 → Quantidade

Escolha: `);

    let novoDado = await perguntar("\nNovo valor: ");

    switch (editar) {

        case "1":
            itensDoEstoque[index].produto = novoDado;
            break;

        case "2":
            itensDoEstoque[index].valor = Number(novoDado);
            break;

        case "3":
            itensDoEstoque[index].quantidade = Number(novoDado);
            break;

        default:
            console.log(
                `${cores.vermelho}Opção inválida.${cores.reset}`
            );
            return;
    }

    console.log(
        `${cores.verde}\n✔ Produto atualizado!${cores.reset}`
    );

    await perguntar("\nPressione ENTER...");
}

// ================= BUSCAR =================

async function buscarItem() {

    console.clear();

    console.log(`
${cores.cyan}🔍 BUSCA DE PRODUTOS${cores.reset}

1 → Nome
2 → Valor
3 → Quantidade
`);

    let tipo = await perguntar("Escolha: ");
    let filtro = await perguntar("Pesquisar: ");

    console.log("\n");

    let encontrado = false;

    itensDoEstoque.forEach((item, i) => {

        switch (tipo) {

            case "1":

                if (
                    item.produto.toLowerCase()
                    .includes(filtro.toLowerCase())
                ) {

                    encontrado = true;

                    console.log(
                        `${cores.verde}${i + 1}.${cores.reset} ${item.produto} | ${cores.amarelo}R$${item.valor}${cores.reset} | Qtd: ${item.quantidade}`
                    );
                }

                break;

            case "2":

                if (item.valor === Number(filtro)) {

                    encontrado = true;

                    console.log(
                        `${cores.verde}${i + 1}.${cores.reset} ${item.produto} | ${cores.amarelo}R$${item.valor}${cores.reset} | Qtd: ${item.quantidade}`
                    );
                }

                break;

            case "3":

                if (item.quantidade === Number(filtro)) {

                    encontrado = true;

                    console.log(
                        `${cores.verde}${i + 1}.${cores.reset} ${item.produto} | ${cores.amarelo}R$${item.valor}${cores.reset} | Qtd: ${item.quantidade}`
                    );
                }

                break;
        }
    });

    if (!encontrado) {
        console.log(
            `${cores.vermelho}Nenhum produto encontrado.${cores.reset}`
        );
    }

    await perguntar("\nPressione ENTER...");
}

// ================= INICIAR =================

menu();
