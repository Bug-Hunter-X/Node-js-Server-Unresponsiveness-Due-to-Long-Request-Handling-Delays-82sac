const http = require('http');
const { Worker } = require('worker_threads');

const server = http.createServer((req, res) => {
  const worker = new Worker('./worker.js');

  worker.on('message', (result) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(result);
  });

  worker.on('error', (err) => {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Error processing request');
    console.error(err);
  });

  worker.on('exit', (code) => {
    if (code !== 0) {
      console.error(`Worker stopped with exit code ${code}`);
    }
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});

// worker.js
const { parentPort } = require('worker_threads');

setTimeout(() => {
  parentPort.postMessage('Hello World!');
}, 5000);