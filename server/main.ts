const express = require('express');
const app = express();
const server = require('http').createServer(app);
const cors = require('cors');
const multer = require('multer');
const upload = multer({
  limits: { fieldSize: 25 * 1024 * 1024 },
});
import ApiEntryPoint from '../src/ApiEntryPoint/Index';

app.use(cors({ origin: '*' }));
app.use(express.json());

app.post('/', upload.none(), async (request: any, response: any) => {
  const { api, token, props } = request.body;

  const Api = new ApiEntryPoint({
    api,
    token,
    props,
  });
  await Api.setVars();
  await Api.execute();

  const responseData = {
    status: Api.getStatus(),
    response: Api.getResponse(),
    Error: Api.getError(),
  };

  response.send(responseData).status(200);
  response.end();
});

server.listen(3007, () => {
  console.log('server crud listo in port 3007');
});
