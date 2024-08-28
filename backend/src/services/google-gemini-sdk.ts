import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import fs from "fs/promises";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY ?? "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function run() {
  const prompt = "Write a story about an AI and magic";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

// run();

const fileManager = new GoogleAIFileManager(process.env.GOOGLE_API_KEY ?? "");

async function runFile() {
  const uploadResponse = await fileManager.uploadFile("jetpack.jpg", {
    mimeType: "image/jpeg",
    displayName: "Jetpack drawing",
  });

  console.log(
    `Uploaded file ${uploadResponse.file.displayName} as: ${uploadResponse.file.uri}`
  );

  const result = await model.generateContent([
    {
      fileData: {
        mimeType: uploadResponse.file.mimeType,
        fileUri: uploadResponse.file.uri,
      },
    },
    { text: "Descreva como este produto pode ser fabricado." },
  ]);

  // Output the generated text to the console
  console.log(result.response.text());
}

runFile();