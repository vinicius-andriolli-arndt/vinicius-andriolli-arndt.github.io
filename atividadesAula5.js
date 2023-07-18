function parOuImpar(){
    const a = math.abs(prompt("digite o valor"));
    alert("valor: " + ((a % 2 == 0 )) );
}
parOuImpar();

//atividade 2
function desconto(){
    const valor = Math.abs(prompt("digite o valor"));  
    valor - ((valor*10)/100);
    alert("valor com desconto: " + ((valor - ((valor*10)/100))));
}
desconto();

//atividade 3
function primo(){
    const b = Math.abs(prompt("digite um numero positivo"));
    if (b < 0 || b > 0){
        var prime = true;
        if (b <= 1){
            prime = false;
        }
        for (var i = 2; i <= Math.sqrt(b); i++){
            if (b % i==0) {
                prime = false;
                break;
            }
        }
        if(prime){
            alert("o numero: " + b + " é primo");
        } else {
            alert("o numero: " + b + " não é primo");
        }
    }
}
primo();

//atividade 4
function anoDia(){
    const c = Math.abs(prompt("digite sua idade"));
    alert ("o seu tempo de vida em dias é: " + ((c * 365)));
}
anoDia();
//atividade 5
function formatarTelefone(telefone) {
    var numeroLimpo = telefone.replace(/\D/g, '');
    var telefoneFormatado = numeroLimpo.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
    return telefoneFormatado;
  }
  
  var numeroTelefone = prompt("Digite um número de telefone:");
  var numeroFormatado = formatarTelefone(numeroTelefone);
  alert("Número de telefone formatado: " + numeroFormatado);