const OpenAI = require('openai');

async function main() {
  const openai = new OpenAI({
    apiKey: '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',
  });

  try {
    console.log('Sending request to OpenAI...');
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'Say this is a test.' }],
    });

    console.log('Response from OpenAI:');
    console.log(JSON.stringify(response, null, 2));
  } catch (error) {
    console.error('Error calling OpenAI API:');
    console.error(error);
  }
}

main();
