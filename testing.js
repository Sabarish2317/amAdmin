const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyAGHRC1sbzUo6pH87Z7y4c5dCtJW6HlzNQ");

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
async function run() {
  const prompt = "how are you ?"

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  console.log(text);
}

run();