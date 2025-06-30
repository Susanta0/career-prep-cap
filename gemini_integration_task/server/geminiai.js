const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const platformGuidelines = {
  LinkedIn: {
    maxLength: 3000,
    tone: "professional and insightful",
    format: "Use paragraphs with line breaks, include 3-5 relevant hashtags, encourage professional engagement",
    style: "thought leadership, industry insights, professional advice, business storytelling"
  },
  Twitter: {
    maxLength: 280,
    tone: "concise and engaging",
    format: "Brief and punchy, use 1-3 hashtags, can include emojis",
    style: "quick tips, hot takes, questions to drive engagement"
  },
  Instagram: {
    maxLength: 2200,
    tone: "engaging and inspirational",
    format: "Story-driven with emojis, line breaks for readability, hashtags at the end",
    style: "visual storytelling, behind-the-scenes, motivational content"
  }
};

async function generatePlatformPost(platform, topic) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const guidelines = platformGuidelines[platform];
    if (!guidelines) throw new Error("Invalid platform guidelines");

    const prompt = `
Generate a ${platform} post about "${topic}".

Guidelines:
- Max Length: ${guidelines.maxLength}
- Tone: ${guidelines.tone}
- Format: ${guidelines.format}
- Style: ${guidelines.style}

Instructions:
1. Make it engaging and relevant for ${platform}
2. Include hashtags
3. Stay under the character limit
4. Return only the post content
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const generatedPost = response.text().trim();

    return generatedPost;
  } catch (error) {
    console.error('Error generating post:', error);
    throw new Error(`Failed to generate post: ${error.message}`);
  }
}

module.exports = {
  generatePlatformPost,
  platformGuidelines
};
