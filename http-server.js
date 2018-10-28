const http = require('http');
const net = require('net');
const hostname = '127.0.0.1';
const port = 3000;
let client = new net.Socket();

const handlers = {
    '/workers': getWorkers,
    '/workers/add': addWorker,
    '/workers/remove': removeWorker
};

function maketFunc(req, res, payload, cb, message) {
    client.write(JSON.stringify(message));
    client.on('data', (data) => {
        cb(null, data || []);
    });
}

function getWorkers(req, res, payload, cb) {
    maketFunc(rq, res, payload, cb, {act: "GET"});
}

function addWorkers(req, res, payload, cb) {
    maketFunc(rq, res, payload, cb, {act: "CREATE", X: payload.X});
}

function removeWorkers(req, res, payload, cb) {
    maketFunc(rq, res, payload, cb, {act: "STOP", id: payload.id});
}