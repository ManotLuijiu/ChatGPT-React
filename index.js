const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const { listModels, callApi } = require('./chatGptApi');
const { OpenAIApi } = require('openai');
const app = express();

app.use(cors());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3001;

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'สวัสดีค่ะ',
  });
});

app.get('/models', async (req, res) => {
  const response = await listModels();
  const models = response.data.data;
  res.status(200).json({
    status: 'ได้รับโมเดลทั้งหมดแล้ว',
    results: models.length,
    models,
  });
});

app.post('/', async (req, res) => {
  const { message, currentModel } = req.body;
  const response = await callApi(message, currentModel);
  res.json({
    message: response.data.choices[0].text,
  });
});

app.listen(port, () => {
  console.log(`ChatGPT listening on http://localhost:${port}`);
});
// create a simple express api that calls the function above
