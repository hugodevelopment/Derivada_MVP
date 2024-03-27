
// Função melhorada para identificar outros tipos de função como somadiferença
function identificarTipoFuncao(funcao) {
  if (/sin|cos|tan/.test(funcao)) {
    console.log("ok")
    return 'trigonometrica';
  } else if (/x/.test(funcao)) {
    if (/\+|\-/.test(funcao)) {
      console.log("soma")
      return 'somadiferença';
    } else if (/x|\^x/.test(funcao)) {
      console.log("Oi")
      return 'polinomial';
    }
  } else {
    return 'outro';
  }
}


//  Função para identificar os o tipo de função em relação ao input
//  function identificarTipoFuncao(funcao) {
//    if (funcao.includes('sin') || funcao.includes('cos') || funcao.includes('tan')) {
//      console.log("ok")
//      return 'trigonometrica';
//   } else if (funcao.includes('x') || funcao.includes('x^')) {
//     console.log("Oi")
//     return 'polinomial';
//   } 
//   // Testando uma função nova
//   else if (funcao.includes('+') || funcao.includes('-') && funcao.includes('x')) {
//     console.log("Oi")
//     return 'somadiferença';
//   }
//   else {
//     return 'outro';
//   }
// }


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

 // Adicione espaços em torno dos operadores '+' e '-'
 funcao = funcao.replace(/\+/g, ' + ').replace(/\-/g, ' - ');

 // Divida a função em termos
 let termos = funcao.split(' ');
 //  verificando os termos ok
//  console.log("verficando",termos)

 for (let i = 0; i < termos.length; i++) {
  var termo = termos[i];
  // console.log("cada termo ", termo)

  // Ignore non-term strings
  if (termo.trim() === '' || termo.trim() === '+' || termo.trim() === '-') {
      continue;
  }
  
  // até aqui está pegando
  try {
      // Calcula a derivada do termo usando math.js
      // console.log("ola try")
      var derivada = math.derivative(termo, 'x');
      // console.log("calc",derivada)
      // let resultadofinal = math.derivative(userInput, 'x').toString();


      const tiposDeFuncao = {
        trigonometrica: [
          { descricao: 'Passo 1: Essa é uma função trigonometrica', equacao: `f(x) = ${funcao}` },
          { descricao: 'Passo 2: Calculando a derivada com a regra da cadeia', equacao: `f'(x) = ${derivada.toString()}`},
          // { descricao: 'Passo 3: Simplificar ...' },
        ],
        polinomial: [
          { descricao: 'Passo 1: Identifique a função polinomial', equacao: `f(x) = ${funcao}` },
          { descricao: 'Passo 2: Aplicar a regra dos polinomios', equacao: `f\'(x) = ${derivada.toString()}`},
        ],
        somadiferença: [
          { descricao: 'Passo 1: Identifique a função:', equacao: `f(x) = \\dfrac{d}{dx}(${funcao})`},
          { descricao: 'Passo 2: Aplicando a regra da soma e diferença:', equacao: `f(x) = \\dfrac{d}{dx}(${termo}) + \\dfrac{d}{dx}`},
          { descricao: 'Passo 3: Aplicar a regra da soma e diferença', equacao: `f\'(x) = ${derivada.toString()}`},
        ],
      };
      
      // Aqui obtemos o tipo da função dependendo do input do user
      var tipoFuncao = identificarTipoFuncao(funcao); 
      // Etapas recebe o objeto indificado pela função tipoFunção, quando indentificado é feito o acessso no objetivo array TiposDeFuncao
      const etapas = tiposDeFuncao[tipoFuncao]; 
      // Verificando
      console.log("ola",etapas);
      // Aqui a função adicionarEtapas recebe o objeto, que pode ser trigonometrico, polinomial e somadiferença
      // ela precisa ser chamada depois que a função calcularDerivada tiver terminado de calcular a derivada e gerado as etapas.
      adicionarEtapas(etapas)
    } 
   catch (error) {
      console.error(`Error calculating derivative of ${termo}: ${error}`);
  }}}
 
  // const removeButton = document.createElement("button");
  // removeButton.textContent = "Apagar";
  // removeButton.style.color = "blue";
  // removeButton.style.fontWeight="bold";
  // removeButton.onclick = function resetEtapas() {
  //   etapasContainer.innerHTML = '';  // Limpa todo o conteúdo do container
  // }
 
//------------------------------------------------------------------------- Mudei até aqui---------------------------------------------------------------------------------------//


// // Aqui é onde a derivada da função é calculada com a biblioteca derivative
// var derivada = math.derivative(funcao, 'x');
// console.log("ok", derivada)
// derivada = termo

// // Objeto tiposDeFunção para adicionar as descrições para cada função, como por exemplo, trigonométrica ou polinomial
// const tiposDeFuncao = {
//   trigonometrica: [
//     { descricao: 'Passo 1: Essa é uma função trigonometrica', equacao: `f(x) = ${funcao}` },
//     { descricao: 'Passo 2: Calculando a derivada com a regra da cadeia', equacao: `f'(x) = ${derivada.toString()}`},
//     // { descricao: 'Passo 3: Simplificar ...' },
//   ],
//   polinomial: [
//     { descricao: 'Passo 1: Identifique a função polinomial', equacao: `f(x) = ${funcao}` },
//     { descricao: 'Passo 2: Aplicar a regra dos polinomios', equacao: `f\'(x) = ${derivada.toString()}`  },
//   ],
//   somadiferença: [
//     { descricao: 'Passo 1: Identifique a função:', equacao: `f(x) = \\dfrac{d}{dx}(${funcao})`},
//     { descricao: 'Passo 2: Aplicando a regra da soma e diferença:', equacao: `f(x) = \\dfrac{d}{dx}(2x) + \\dfrac{d}{dx}`},
//     // como está fora do for, ele vai pegar o ultimo termo, que será 1
//     { descricao: 'Passo 3: Aplicar a regra da soma e diferença', equacao: `f\'(x) = ${derivada.toString()}`},
//   ],
// };

// // Aqui obtemos o tipo da função
// var tipoFuncao = identificarTipoFuncao(funcao); 
// const etapas = tiposDeFuncao[tipoFuncao]; // O objeto etapas recebe o tipo de função digitado no input
// console.log(etapas);
// adicionarEtapas(etapas)}


//Função para criar as descrições das etapas na div
function adicionarEtapas(etapas) {
  const etapasContainer = document.querySelector('.etapas');

  var removeButton = document.createElement("button");
  removeButton.textContent = "Apagar";
  removeButton.style.color = "blue";
  removeButton.style.fontWeight="bold";
  removeButton.onclick = function resetEtapas() {
    etapasContainer.innerHTML = '';  // Limpa todo o conteúdo do container
  }
  etapasContainer.appendChild(removeButton);

  //Cada loop é uma criação de um elemento na div, sendo o 1º a div, depois o paragrafo e o span
  etapas.forEach((passo) => {
    console.log(passo.equacao)
    // criando o elemento div para aparecer na tela
    const passoDiv = document.createElement('div');

    // A classe ‘etapa’ está sendo adicionada ao elemento passoDiv. 
    // Isso significa que todos os estilos CSS associados à classe ‘etapa’ serão aplicados ao elemento passoDiv.
    passoDiv.classList.add('etapa'); 
    
    // Aqui esta criando o elemento da descrição para aparecer na tela, nesse é um elemento do tipo paragrafo
    const descricao = document.createElement('p');
    // Aqui ele recebe o valor descrição do elemento passo
    descricao.textContent = passo.descricao;
    descricao.style.color= "darkred";
    descricao.style.fontWeight="bold";
    passoDiv.appendChild(descricao);

    if (passo.equacao) {
      const equacao = document.createElement('span');
      equacao.textContent = passo.equacao;
       // Adicione o código LaTeX da equação entre os delimitadores de dólar (\$)
       equacao.innerHTML = `$$${passo.equacao}$$`;
       passoDiv.appendChild(equacao);
    }
    
etapasContainer.appendChild(passoDiv)
});

 // Após adicionar as etapas, renderize as equações usando MathJax
 MathJax.typesetPromise([etapasContainer])
 .catch((err) => console.log('Erro ao renderizar as equações:', err));}
// ------------------------------------------ estudo -------------------------------------------------//


// // Botão de remover
  // var removeButton = document.createElement("button");
  // removeButton.textContent = "Apagar";
  // removeButton.style.color = "blue";
  // // removeButton.margin="10%";
  // removeButton.onclick = function () {
  //     etapasContainer.remove();
  // };
  // etapasContainer.appendChild(removeButton);
  
// Botão de remover antes do loop, o problema é que apaga tudo e não volta o passo a passo
// var removeButton = document.createElement("button");
// removeButton.textContent = "Remover";
// removeButton.style.color = "darkred";
// removeButton.onclick = function () { 
// removeTask(passoDiv);
// };
// passoDiv.appendChild(removeButton);

// Jeito mais simples de fazer
// var removeButton = document.createElement("button");
// removeButton.textContent = "Apagar";
// removeButton.style.color = "blue";
// removeButton.onclick = function () {
//     etapasContainer.remove();
// };   
// etapasContainer.appendChild(removeButton);

// Aqui apagaria para cada passo já que está dentro do loop
    // var removeButton = document.createElement("button");
    // removeButton.textContent = "apaga";
    // removeButton.style.color = "pink";
    // removeButton.onclick = function () {
    // container.remove();}   
    // passoDiv.appendChild(removeButton);
  