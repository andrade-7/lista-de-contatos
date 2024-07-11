const nome = document.querySelector("#nome");
const numero = document.querySelector("#numero");
const email = document.querySelector("#email");
const contatos = document.querySelector("#contatos");
const formulario = document.querySelector("#formulario");

// Função para salvar contatos no localStorage
function salvarContatos(contatos) {
    localStorage.setItem('contatos', JSON.stringify(contatos));
}

// Função para carregar contatos do localStorage
function carregarContatos() {
    const contatosSalvos = localStorage.getItem('contatos');
    return contatosSalvos ? JSON.parse(contatosSalvos) : [];
}

// Função para exibir um contato
function exibirContato(contato) {
    const contatoElement = document.createElement('div');
    contatoElement.classList.add('box');

    contatoElement.innerHTML = `
        <h2>Nome: ${contato.nome}</h2>
        <p>Número: ${contato.numero}</p>
        <p>E-mail: ${contato.email}</p>
        <button class="editar">Editar</button>
        <button class="excluir">Excluir</button>
    `;

    contatoElement.querySelector('.editar').addEventListener('click', () => {
        nome.value = contato.nome;
        numero.value = contato.numero;
        email.value = contato.email;
        contatos.removeChild(contatoElement);

        const contatosAtualizados = carregarContatos().filter(c => c.email !== contato.email);
        salvarContatos(contatosAtualizados);
    });

    contatoElement.querySelector('.excluir').addEventListener('click', () => {
        contatos.removeChild(contatoElement);

        const contatosAtualizados = carregarContatos().filter(c => c.email !== contato.email);
        salvarContatos(contatosAtualizados);
    });

    contatos.appendChild(contatoElement);
}

// Carregar contatos ao iniciar a página
document.addEventListener('DOMContentLoaded', () => {
    const contatosCarregados = carregarContatos();
    contatosCarregados.forEach(contato => exibirContato(contato));
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const cadastrar_contato = {
        nome: nome.value,
        numero: numero.value,
        email: email.value
    };

    const contatosAtualizados = carregarContatos();
    contatosAtualizados.push(cadastrar_contato);
    salvarContatos(contatosAtualizados);

    exibirContato(cadastrar_contato);

    formulario.reset();
});
