#!/usr/bin/env node

var WebSocketServer = require('websocket').server;
var http = require('http');
var fetch = require("node-fetch");

var clientsConnected = [];
var kitchen = {};
var orders = [];

//Cria o server
var server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Recebida requisição para ' + request.url);
    response.writeHead(404);
    response.end();
});

//Inicia o server
server.listen(3000, function() {
    console.log((new Date()) + ' WebSocket Server rodando na porta 3000');
});

//Monta o objeto do tipo WebSocketServer
wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});

//Criptografa a requisição e faz o handshake (sinceramente não sei como esse método funciona)
wsServer.on('upgrade', function (req, socket) {
    if (req.headers['upgrade'] !== 'websocket') {
        socket.end('HTTP/1.1 400 Bad Request');
        return;
    }
    const acceptKey = req.headers['sec-websocket-key'];
    const hash = generateAcceptValue(acceptKey);
    const responseHeaders = [ 'HTTP/1.1 101 Web Socket Protocol Handshake', 'Upgrade: WebSocket', 'Connection: Upgrade', `Sec-WebSocket-Accept: ${hash}` ];

    const protocol = req.headers['sec-websocket-protocol'];
    const protocols = !protocol ? [] : protocol.split(',').map(s => s.trim());
    if (protocols.includes('json')) {
        responseHeaders.push(`Sec-WebSocket-Protocol: json`);
    }

    socket.write(responseHeaders.join('\r\n') + '\r\n\r\n');
});

//Leitura das requests para o websocket
wsServer.on('request', function(request) {

    var connection = request.accept();
    clientsConnected.push(connection);

    //Quando recebe mensagem
    connection.on('message', function(message) {

        if (message.type === 'utf8') {
            try {
                var data = JSON.parse(message.utf8Data);
            } catch (e) {
                mensagem = formatMessage("erro", 'Formato da mensagem inválido, as mensagens devem ser no formato JSON e devem seguir o padrão de formatação, exemplo: {"action":"nomeDoMetodo","params":{"parametro":"1"}}');
                connection.sendUTF(mensagem);
                console.log('Formato da mensagem inválido, as mensagens devem ser no formato JSON e devem seguir o padrão de formatação, exemplo: {"action":"nomeDoMetodo","params":{"parametro":"1"}}');
                return;
            }

            const action = data.action;
            switch(action) {
                case "login":
                    doLogin(data.params.table, connection);
                    answerMessage = formatMessage("loginAnswer", 'success');
                    connection.sendUTF(answerMessage);
                    break;
                    case "helloKitchen":
                    message = formatMessage("helloKitchen", {"table": data.params.table, "message": "Hello Kitchen"});
                    kitchenConnected.sendUTF(message);
                    console.log("Mensagem enviada para a COZINHA, pela MESA " + data.params.table);
                    break;
                case "helloClient":
                    const tableConnection = getConnectionByTable(data.params.table);
                    message = formatMessage("helloClient", {"message": "Hello Client"});
                    tableConnection.sendUTF(message);
                    console.log("Mensagem enviada para a MESA "+ data.params.table +", pela COZINHA");
                    break;
                case "newOrder":
                    const resultRequest = sendRequestOrder(data.params);
                    resultRequest
                        .then(() => {
                            addNewTableOrder(data.params);
                            message = formatMessage("newOrder", {"table": data.params.table, "item": data.params.item, "value": data.params.value, "quantity": data.params.quantity});
                            kitchenConnected.sendUTF(message);
                            console.log("Pedido da MESA " + data.params.table + " enviado a COZINHA");
                        })
                        .catch((error) => {
                            const mesagem = formatMessage("rollBackOrder", data.params.item);
                            connection.send(mesagem);
                            console.log(error);
                        })
                    ;
            }
        }
    });
});

function getIndexByConnection(connection) {
  let index;
  clientsConnected.forEach(function(valor, chave) {
    if (connection == valor) {
      index = chave;
    }
  });

  return index;
}

function getConnectionByTable(tableName) {
    for (tableConnected of tablesConnected) {
        if (tableConnected['table'] == tableName) {
            return tableConnected;
        }
    }
}

async function sendRequestOrder(order) {
    const urlAPI = "https://64c7005c0a25021fde9207d4.mockapi.io/ravin/orders";
    const request = await fetch(urlAPI, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(order)
    })
    
    return request.json();
}

function addNewTableOrder(order) {
    orders[order.table] = order;
}


function doLogin(table, connection) {
    var index = getIndexByConnection(connection);
    if (index === false) {
        let mensagem = formatMessage("erro", "Erro ao efetuar login");
        connection.sendUTF(mensagem);
        console.log('Erro ao efetuar login, MESA ' + table);
    } else {
        if (table === "kitchen"){
            kitchenConnected = connection;
            console.log('Cozinha online');
        }else{
            clientsConnected[index]['table'] = table;
            console.log('Mesa online ' + table);
        }
    }
}

function formatMessage(action, data) {
	
    let mensagem;

    switch(action) {
        case 'erro':
        case 'loginAnswer':
            mensagem = {"action":action,"params":{"msg":data}};
            break;
            case 'helloKitchen':
        case 'helloClient':
            message = {"action": action, "params": {"table": data.table, "msg": data.message}}
            break;
        case 'newOrder':
            message = {"action": action, "params": data};
            break;
        case 'rollBackOrder':
            message = {"action": action, "params": {"item": data}};
            break;
    }

    return JSON.stringify(mensagem);
}