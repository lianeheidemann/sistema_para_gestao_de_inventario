const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// ================= ESTOQUE =================
let itensDoEstoque = [
    { produto: "Top", valor: 60, quantidade: 46 },
    { produto: "Croped", valor: 80, quantidade: 30 },
    { produto: "Calça Leg", valor: 80, quantidade: 9 }
];

// ================= PROMPT ASSÍNCRONO =================
function perguntar(texto) {
    return new Promise(resolve => {
        rl.question(texto, resposta => {
            resolve(resposta);
        });
    });
}

// ================= MENU =================
async function menu() {
    let continuar = true;

    console.log(`
1 -> Exibir Estoque Completo
2 -> Adicionar Item no Estoque  
3 -> Remover Produto do Estoque
4 -> Editar Produto
5 -> Buscar Item
6 -> Sair
`);

    while (continuar) {
        let opcao = await perguntar("\nEscolha uma opção: ");

        switch (opcao) {
            case "1":
                printArray();
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
                console.log("Sistema finalizado.");
                continuar = false;
                rl.close();
                break;

            default:
                console.log("Opção inválida!");
        }
    }
}

// ================= FUNÇÕES =================

function printArray() {
    if (itensDoEstoque.length === 0) {
        console.log("Estoque vazio.");
        return;
    }

    itensDoEstoque.forEach((item, i) => {
        console.log(
            `${i + 1}º Produto: ${item.produto}, \n   Preço: R$${item.valor} \n   Quant: ${item.quantidade}`
        );
    });
}

async function addItemNoEstoque() {
    let produto = await perguntar("Nome do Produto: ");
    let valor = await perguntar("Valor: ");
    let quantidade = await perguntar("Quantidade: ");

    itensDoEstoque.push({
        produto,
        valor: Number(valor),
        quantidade: Number(quantidade)
    });

    let resposta = await perguntar("Adicionar outro item? [S/N]: ");

    if (resposta.toLowerCase() === "s") {
        await addItemNoEstoque();
    }
}

async function removerItemNoEstoque() {
    let removerProduto = await perguntar("Nome do produto a ser removido: ");

    const index = itensDoEstoque.findIndex(
        item => item.produto === removerProduto
    );

    if (index !== -1) {
        itensDoEstoque.splice(index, 1);
        console.log("Produto removido com sucesso!");
    } else {
        console.log("Produto não encontrado.");
    }
}

async function edicaoDeItens() {
    printArray();

    let nome = await perguntar("Nome do produto para editar: ");

    let index = itensDoEstoque.findIndex(
        item => item.produto === nome
    );

    if (index === -1) {
        console.log("Produto não encontrado.");
        return;
    }

    let editar = await perguntar("Editar: 1-> Nome | 2-> Valor | 3-> Quantidade: ");
    let novoDado = await perguntar("Novo valor: ");

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
            console.log("Opção inválida.");
    }
}

function printItem(i) {
    let item = itensDoEstoque[i];
    console.log(`${i + 1}) Produto: ${item.produto}, Preço: ${item.valor}, Quantidade: ${item.quantidade}`);
}

async function buscarItem() {
    let tipo = await perguntar("Buscar por: 1-> Nome | 2-> Valor | 3-> Quantidade: ");
    let filtro = await perguntar("Digite o filtro: ");

    itensDoEstoque.forEach((item, i) => {
        switch (tipo) {
            case "1":
                if (item.produto === filtro) printItem(i);
                break;

            case "2":
                if (item.valor === Number(filtro)) printItem(i);
                break;

            case "3":
                if (item.quantidade === Number(filtro)) printItem(i);
                break;
        }
    });
}

// ================= INICIAR =================
menu();
