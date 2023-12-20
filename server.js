import express from 'express';

const server = express();
const PORT = 3000;

server.use(express.static('dist'));
server.use('/*', (req, res) => {
  res.sendFile('/dist/index.html', { root: '.' });
});

server.listen(PORT, () => console.log(`Local express server: http://localhost:${PORT}/`));
