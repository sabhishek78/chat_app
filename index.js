const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const http = require('http').createServer();
const io = require('socket.io')(http);
const port = 3000
io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('simple chat message', (evt) => {
        console.log(evt);
        rl.prompt('>');
        socket.broadcast.emit('simple chat message', evt);
    })
})
io.on('disconnect', (evt) => {
    console.log('disconnected')
})
http.listen(port, () => console.log(`server listening on port: ${port}`))