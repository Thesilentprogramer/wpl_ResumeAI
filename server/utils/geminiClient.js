const { GoogleGenerativeAI } = require('@google/generative-ai');

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.warn('⚠️  GEMINI_API_KEY not found in environment variables');
}

const genAI = new GoogleGenerativeAI(API_KEY || 'dummy-key');

async function analyzeResume(resumeText) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    
    const prompt = `You are a professional resume reviewer. Analyze the following resume and return a JSON response with the following structure:

{
  "summary": "Brief candidate summary (2-3 sentences)",
  "skills": ["skill1", "skill2", "skill3..."],
  "atsScore": 85,
  "missingKeywords": ["keyword1", "keyword2..."],
  "suggestions": ["suggestion1", "suggestion2", "suggestion3..."],
  "strengths": ["strength1", "strength2..."],
  "weaknesses": ["weakness1", "weakness2..."]
}

Analyze the resume thoroughly and provide actionable insights. ATS score should be between 0-100 based on formatting, keywords, structure, and clarity.

Resume text:
${resumeText}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    return {
      summary: "Analysis completed",
      skills: [],
      atsScore: 75,
      missingKeywords: [],
      suggestions: text.split('\n').filter(line => line.trim()),
      strengths: [],
      weaknesses: []
    };
  } catch (error) {
    console.error('Error analyzing resume:', error);
    throw new Error('Failed to analyze resume: ' + error.message);
  }
}

async function chatAboutResume(message, resumeText) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    
    const prompt = `You are an AI resume consultant. Use the following resume text to answer questions and give personalized advice.

Resume:
${resumeText}

User Question: ${message}

Provide a helpful, concise answer based on the resume content. Be specific and actionable. IMPORTANT: Do not use markdown formatting (no **, no *, etc.). Provide plain text with simple formatting.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error in chat:', error);
    throw new Error('Failed to generate chat response: ' + error.message);
  }
}

module.exports = { analyzeResume, chatAboutResume };

