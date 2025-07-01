import { GoogleGenerativeAI } from "@google/generative-ai";
let api = "AIzaSyDu9Ch2fr-Q3G6v4V7ojnhUo8dRGEeq_xE";
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

  const result = await model.generateContent(prompt);
  const response = await result.response;
  let output = response.text();
//   output = output.replace(/```(?:json)?/gi, "").replace(/```/g, "").trim();
  console.log(output);
  
  try {
    return JSON.parse(output);
  } catch {
    return [];
  }
}


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

//   try {
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     let output = response.text();

//     // Remove Markdown code block if present
//     output = output.replace(/```(?:json)?/gi, "").replace(/```/g, "").trim();

//     return JSON.parse(output);
//   } catch (error) {
//     console.error("Failed to get suggestions:", error);
//     return [];
//   }
// }
