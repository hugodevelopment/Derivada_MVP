//  Função para identificar os o tipo de função em relação ao input
 function identificarTipoFuncao(funcao) {
   if (funcao.includes('sin') || funcao.includes('cos') || funcao.includes('tan')) {
     console.log("ok")
     return 'trigonometrica';
  } else if (funcao.includes('x') || funcao.includes('x^')) {
    console.log("Oi")
    return 'polinomial';
  } else {
    return 'outro';
  }
}


function calcularDerivada() {
var funcao = document.getElementById("funcao").value;
if (funcao == ''){
   erro = document.getElementById('erro');
   erro.innerHTML = 'Valor Errado';
   erro.style.color = 'red';
   erro.style.fontSize = 'small';
}else{
  erro.innerHTML = '';
}

// Aqui é onde a derivada da função é calculada com a biblioteca derivative
var derivada = math.derivative(funcao, 'x');
console.log(typeof derivada)

// Objeto tiposDeFunção para adicionar as descrições para cada função, como por exemplo, trigonométrica ou polinomial
const tiposDeFuncao = {
  trigonometrica: [
    { descricao: 'Passo 1: Essa é uma função trigonometrica', equacao: `f(x) = ${funcao}` },
    { descricao: 'Passo 2: Calculando a derivada com a regra da cadeia', equacao: `f'(x) = ${derivada.toString()}`},
    // { descricao: 'Passo 3: Simplificar ...' },
  ],
  polinomial: [
    { descricao: 'Passo 1: Identifique a função polinomial', equacao: `f(x) = ${funcao}` },
    { descricao: 'Passo 2: Aplicar a regra dos polinomios', equacao: `f\'(x) = ${derivada.toString()}`  },
  ],
};

// Aqui obtemos o tipo da função
var tipoFuncao = identificarTipoFuncao(funcao); 
const etapas = tiposDeFuncao[tipoFuncao]; // O objeto etapas recebe o tipo de função digitado no input
console.log(etapas);
adicionarEtapas(etapas)
} 

// Função para criar as descrições das etapas na div
function adicionarEtapas(etapas) {
  const etapasContainer = document.querySelector('.etapas');
  //  etapasContainer.innerHTML = '';

  // const etapas = tiposDeFuncao[tipoFuncao];
  //Cada loop é uma criação de um elemento na div, sendo o 1º a div, depois o paragrafo e o span
  etapas.forEach((passo) => {
    const passoDiv = document.createElement('div');
    passoDiv.classList.add('etapa');

    const descricao = document.createElement('p');
    console.log(descricao)
    descricao.textContent = passo.descricao;
    descricao.style.color= "darkred";
    descricao.style.fontWeight="bold"
    passoDiv.appendChild(descricao);

    if (passo.equacao) {
      const equacao = document.createElement('span');
      equacao.textContent = passo.equacao;
       // Adicione o código LaTeX da equação entre os delimitadores de dólar (\$)
       equacao.innerHTML = `$$${passo.equacao}$$`;
      passoDiv.appendChild(equacao);
    }


 etapasContainer.appendChild(passoDiv)});
 // Após adicionar as etapas, renderize as equações usando MathJax
 MathJax.typesetPromise([etapasContainer])
 .catch((err) => console.log('Erro ao renderizar as equações:', err));
}

