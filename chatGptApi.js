const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  organization: process.env.OPENAI_ORGANIZATION,
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function listModels() {
  const response = await openai.listModels();
  return response;
}

async function callApi(prompt, model) {
  const response = await openai.createCompletion({
    model: `${model}`,
    prompt: `${prompt}`,
    temperature: 0,
    max_tokens: 100,
    top_p: 1,
    frequency_penalty: 0.5,
    presence_penalty: 0,
    stop: ['"""'],
  });

  return response;
}

module.exports = {
  listModels,
  callApi,
};
