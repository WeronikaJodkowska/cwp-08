const fs = require('fs');
const spawn = require('child_process').spawn;
const net = require('net');
let seed = 0;
const port = 8003;
let idWorker = 0;
let workers = [];

const serverDo = {
    "CREATE":createWorker,
    "GET":getWorkers,
    "STOP":stopWorker
};

const server = net.createServer((client)=>{
    client.setEncoding('utf8');
    client.id = `${Date.now()}seed${++seed}`;
    client.on('data', (data) => {
        data = JSON.parse(data);
        serverDo[data.act](client, data);
    });
});

server.listen(port, () => {
    console.log(`Server running at ${port}`);
});

