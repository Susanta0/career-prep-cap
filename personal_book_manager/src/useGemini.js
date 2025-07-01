// import { GoogleGenerativeAI } from "@google/generative-ai";
// let api = "AIzaSyBTYwE7C1Xi-DutRcQ3jYZsJTkvMQcDhxk";
// const genAI = new GoogleGenerativeAI(api);

// // Suggest similar books using Gemini API
// export async function getSuggestions(title, author) {
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//   const prompt = `
//     Suggest 3 books similar to '${title}' by ${author}. 
//     Return in JSON format as an array of objects with "title" and "author" fields.
//     Example:
//     [
//       {"title": "Book 1", "author": "Author 1"},
//       {"title": "Book 2", "author": "Author 2"},
//       {"title": "Book 3", "author": "Author 3"}
//     ]
//   `;

//   const result = await model.generateContent(prompt);
//   const response = await result.response;
//   const output = response.text();

//   try {
//     return JSON.parse(output);
//   } catch {
//     return [];
//   }
// }


import { GoogleGenerativeAI } from "@google/generative-ai";

let api = "AIzaSyBTYwE7C1Xi-DutRcQ3jYZsJTkvMQcDhxk";
const genAI = new GoogleGenerativeAI(api);

// Suggest similar books using Gemini API
export async function getSuggestions(title, author) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    Suggest 3 books similar to '${title}' by ${author}. 
    Return in JSON format as an array of objects with "title" and "author" fields.
    Example:
    [
      {"title": "Book 1", "author": "Author 1"},
      {"title": "Book 2", "author": "Author 2"},
      {"title": "Book 3", "author": "Author 3"}
    ]
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const output = response.text();

    return JSON.parse(output);
  } catch (error) {
    console.error("Failed to get suggestions:", error);
    return [];
  }
}
