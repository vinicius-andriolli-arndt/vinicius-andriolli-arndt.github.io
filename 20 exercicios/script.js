/* 1. */
function ehParOuImpar() {
    const numero = Math.abs(prompt("Digite um número:"))

    if (numero < 0 || numero > 0) {
        if (numero % 2 === 0) {
                alert(numero + " é par!")
        } else {
            alert(numero + " é ímpar!")
        }
    } else {
        alert("Digite um número válido!")
    }
}

/* 2. */
function calcularDescontoProduto() {
    let preco = Math.abs(prompt("Digite o preço do produto:"))

    if (preco > 0) {
        preco = preco * 0.9
        alert("Preco com desconto de 10%: "+preco)
    } else {
        alert("Digite um valor válido!")   
    }
}

/* 3. */
function ehPrimo() {
    const numero = Math.abs(prompt("Digite um número:"))

    if (numero <= 1) {
        alert("Não é primo!")
        return
    }

    for (let i=2; i < numero; i++) {
        if (numero % i === 0) {
            alert("Não é primo!")
            return
        }
    }

    alert("O número " + numero + " é primo")
} 

/* 4. */
function idadeParaDias() { 
    const anos = Math.abs(prompt("Digite a idade da pessoa:"))

    let dias = anos * 365

    alert("A pessoa tem " + dias +" dias de vida!")
}

/* 5. */
function formatarNumeroTelefone() { 
    const numero = prompt("Digite um número de telefone com DDD:")
    
    let ddd = numero.substring(0, 2)
    let part1 = numero.substring(2, 6)
    let part2 = numero.substring(6, 10)

    alert("("+ddd+")"+part1 + "-" +part2)
}

/* 6. */
function exbibirNumerosParesUmADez() {
    let pares = ""

    for (var i=1; i <= 10; i++) {
        if (i % 2 === 0) {
            pares +=  " "+i+","
        }
    }

    alert("Números pares de 1 a 10: "+pares)
}

/* 7. */
function media() {
    let notas = []

    for (var i= 1; i <= 3; i++) {
        nota = Number(prompt("Insira nota "+i))
        if (nota >= 0 && nota <= 10 ) {
            notas.push(nota)
        } else {
            alert("Nota Invalida")
        }
    }

    alert( "média = "+ ((notas[0] + notas[1] + notas[2]) / 3))
}

/* 8. */
function contagemRegressiva() {//
    for (var i=10; i >= 1; i--) {
        alert("Contagem regressiva: "+i);
    }
}

/* 9. */
function contemLetra() {
    const palavra = prompt("Digite uma palavra:")
    const letra = prompt("Digite a letra que deseja verificar:")

    if (palavra.includes(letra)) {
        alert(palavra+" contém "+letra)
    } else {
        alert(palavra+" não contém "+letra)
    }
}

/* 10. */
function converterParaMaiusculas() {
    const frase = prompt("Digite uma frase para converter para maiúsculas:")

    let maiusculas = ""
    let vetor = frase.split('')

    for (let i=0; i < vetor.length; i++) {
        maiusculas += vetor[i].toUpperCase()
    }

    alert(maiusculas);
}

/* 11. */
function numeroImparesUmAVinte() {
    let numero = 1
    let impares = ""

    while (numero <= 20) {
        
        if (numero % 2 !== 0) {
            impares += " "+numero+", "
        }

        numero++
    }

    alert("Números ímpares de 1 a 20: "+impares)
}

/* 12. */
function calculaMediaVetor() {
    let vetor = []
    let media = 0

    // popular o veto
    for (let i=0; i < 10; i++) {
        let num = (Math.random() * 10) + 1
        vetor[i] = num
    }


    for (let i=0; i < vetor.length; i++) {
        media += vetor[i];
    }

    alert("10 elementos: "+vetor)

    alert("Média de 10 elementos: "+(media / vetor.length))
}

/* 13. */
function acertarNumero() {
    let numero = Math.floor(Math.random() * 100) + 1
    let digitado = 0

    do {
        digitado = parseInt(prompt("Adivinhe qual é o número de 1 a 100:"))
        if (digitado < 0 || digitado > 0) {
            if (digitado > numero) {
                alert("Menor")
            } else {
                if (digitado < numero){
                    alert("Maior")
                }
            }
        } else {
            alert("Digite um número válido!")
        }
        
    } while(digitado !== numero)

    alert("Acertou! o número é "+ numero)
}

/* 14. */
function somarCemElementoVetor() {
    let vetor = []
    let soma = 0
    
    for (let i=0; i < 100; i++) {
        vetor[i] = Math.floor(Math.random() * 100) + 1
    }

    for (num of vetor) {
        soma += num
    }

    alert("Números que serão somados: "+vetor)
    alert("Soma: "+ soma)
}

/* 15. */
function sequenciaFibonacci() {
    let sequencia = [0, 1]
    let proximoTermo = 0

    for (let i=2; i < 10; i++) {
        proximoTermo = sequencia[i - 1] + sequencia[i - 2]
        sequencia.push(proximoTermo)
    }

    alert("A sequência Fibonacci até o décimo temo é: "+ sequencia)
}

/* 16. */
function lerListaNumerosInteiro() {
    let vetor = []
    let numero

    while(numero !== 0) {
        numero = parseInt(prompt("Digite um número para adicionar na lista(digite Zero quando estiver satisfeito):"))
        vetor.push(numero)
    }

    vetor.sort();

    alert("Números adicionados na lista: "+vetor)

    alert("Maior número da lista: "+vetor[vetor.length -1])
}

/* 17. */
function acertarSenha() {
    const senhaCadastrada = prompt("Cadastre uma nova senha:")
    let senha = ""

    do{
        senha = prompt("Digite a senha:")
        if (senha !== senhaCadastrada) {
            alert("Senha incorreta!")
        }

    }while(senha !== senhaCadastrada)

    alert("Senha correta!")
}

/* 18. */
function contarLetraA() {
    const string = prompt("Digite uma String:")
    let cont = 0

    for (c of string) {
        if (c === "a" || c === "A") {
            cont++
        }
    }

    alert("A string possui "+cont+" lestras A")
}

/* 19. */
function numerosPrimosDeUmACem() {
    let vetor = []
    let cont = 0

    for (let i=1; i <= 100; i++) {
        cont = 0
        for (let j=1;j <= i; j++) {
            if (i % j == 0) {
                cont++
            }
        }
        if(cont == 2) {
            vetor.push(i)
        }
    }
        

    alert("Números primos de 1 a 100: " + vetor)
}

/* 20. */
function somarParesUmACiquenta() {
    let cont = 1
    let soma = 0
    while(cont <= 50) {
        if(cont % 2 === 0) {
            soma += cont
        }

        cont++
    }

    alert("Soma dos números pares de 1 a 50: "+ soma)
}


/* Evendo de clique aos botões */
// Adicionar o evento de clique ao botão
document.getElementById("botao-1").addEventListener('click', ehParOuImpar);
document.getElementById("botao-2").addEventListener('click', calcularDescontoProduto);
document.getElementById("botao-3").addEventListener('click', ehPrimo);
document.getElementById("botao-4").addEventListener('click', idadeParaDias);
document.getElementById("botao-5").addEventListener('click', formatarNumeroTelefone);
document.getElementById("botao-6").addEventListener('click', exbibirNumerosParesUmADez);
document.getElementById("botao-7").addEventListener('click', media);
document.getElementById("botao-8").addEventListener('click', contagemRegressiva);
document.getElementById("botao-9").addEventListener('click', contemLetra);
document.getElementById("botao-10").addEventListener('click', converterParaMaiusculas);

document.getElementById("botao-11").addEventListener('click', numeroImparesUmAVinte);
document.getElementById("botao-12").addEventListener('click', calculaMediaVetor);
document.getElementById("botao-13").addEventListener('click', acertarNumero);
document.getElementById("botao-14").addEventListener('click', somarCemElementoVetor);
document.getElementById("botao-15").addEventListener('click', sequenciaFibonacci);
document.getElementById("botao-16").addEventListener('click', lerListaNumerosInteiro);
document.getElementById("botao-17").addEventListener('click', acertarSenha);
document.getElementById("botao-18").addEventListener('click', contarLetraA);
document.getElementById("botao-19").addEventListener('click', numerosPrimosDeUmACem);
document.getElementById("botao-20").addEventListener('click', somarParesUmACiquenta);