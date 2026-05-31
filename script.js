let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function adicionarCarrinho(nome, preco){

  carrinho.push({nome, preco});

  salvarCarrinho();

  atualizarCarrinho();

}

function salvarCarrinho(){
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function atualizarCarrinho(){

  const itens = document.getElementById('itens-carrinho');
  const contador = document.getElementById('contador');
  const total = document.getElementById('total');

  if(!itens) return;

  itens.innerHTML = '';

  let totalValor = 0;

  carrinho.forEach((item, index)=>{

    totalValor += item.preco;

    itens.innerHTML += `
      <div class="item-carrinho">

        <div>
          <p>${item.nome}</p>
          <span>R$ ${item.preco.toFixed(2)}</span>
        </div>

        <button class="btn-remover" onclick="removerItem(${index})">
          ✖
        </button>

      </div>
    `;

  });

  contador.innerText = carrinho.length;

  total.innerText = totalValor.toFixed(2);

}

function removerItem(index){

  carrinho.splice(index, 1);

  salvarCarrinho();

  atualizarCarrinho();

}

function abrirCarrinho(){
  document.getElementById('carrinho').classList.add('ativo');
}

function fecharCarrinho(){
  document.getElementById('carrinho').classList.remove('ativo');
}

function copiarPix(){

  navigator.clipboard.writeText('51996890929');

  alert('PIX copiado com sucesso!');

}

function pago(){

  alert('Pagamento realizado com sucesso! Obrigado pela compra ❤️');

}

function finalizarPedido(){

  const nome = document.getElementById('nome').value;
  const turma = document.getElementById('turma').value;

  let mensagem = `Olá! Quero fazer um pedido:%0A%0A`;

  carrinho.forEach(item=>{
    mensagem += `• ${item.nome} - R$ ${item.preco.toFixed(2)}%0A`;
  });

  const total = carrinho.reduce((acc, item)=> acc + item.preco, 0);

  mensagem += `%0ATotal: R$ ${total.toFixed(2)}`;
  mensagem += `%0ANome: ${nome}`;
  mensagem += `%0ATurma: ${turma}`;
  mensagem += `%0A%0AJá realizei o pagamento via PIX.`;

  window.open(`https://wa.me/555196890929?text=${mensagem}`,'_blank');

}

atualizarCarrinho();