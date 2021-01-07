
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let username=null;
start();
  function start(){
     rl.question('What is your name? ', (user) => {
         username=user;
         connect();


 })
  }

function connect(){
    var socket = require('socket.io-client')('http://localhost:3000');
    socket.on('connect', (message) => {
        console.log('Successfully connected to Server');
        rl.prompt('>');
    })
    socket.on('simple chat message', (data) => {
        console.log(data);
        rl.prompt('>');
    })
    rl.on('line', (line) => {
        console.log( 'Sending message:'+line);
        socket.emit('simple chat message', username+' says '+line);
        rl.prompt('>');
    });
    socket.on('disconnect', function() {
        console.log( 'Connection lost...');
        rl.prompt('>');
    });
}





// repl.start({
//     prompt: '',
//     eval: (cmd) => {
//         socket.send(cmd)
//     }
// })