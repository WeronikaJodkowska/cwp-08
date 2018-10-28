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

function createWorker(client, data) {
    client.X = data.X || 1;
    client.startedOn = currentDate();
    let workerId = `${client.id}${++idWorker}`;
    client.file = `${process.cwd()}/${workerId}.json`;
    client.proc = spawn('node', ['worker.js', client.file, client.X], {detached: true});
    client.write(JSON.stringify({id: `${workerId}`, startedOn: client.startedOn}));
    workers.push({id: `${workerId}`, X: client.X, startedOn: client.startedOn, file: client.file, proc: client.proc});
}

