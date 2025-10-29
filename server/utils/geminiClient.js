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

async function suggestResumeContent(fieldName, fieldValue, templateId, resumeData) {
  try {
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'dummy-key') {
      throw new Error('Gemini API key is not configured');
    }
    
    // Use gemini-pro which is the stable model name for v1 API
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    
    // Define template-specific writing styles
    const templateStyles = {
      google: 'concise, action-oriented, data-driven, innovative, user-focused',
      microsoft: 'professional, structured, achievement-focused, enterprise-oriented, results-driven',
      apple: 'elegant, minimalist, design-focused, precision-oriented, impactful',
      amazon: 'results-driven, metric-focused, customer-obsessed, data-oriented, action-based',
      meta: 'innovative, impact-driven, tech-forward, scalable, future-focused',
      netflix: 'creative, bold, data-driven, culture-focused, excellence-oriented',
      tesla: 'innovative, mission-driven, impact-focused, engineering excellence, sustainable',
      uber: 'growth-oriented, scalable, data-driven, impact-focused, innovative'
    };

    const styleGuide = templateStyles[templateId] || templateStyles.google;
    
    const prompt = `You are an expert resume writer specializing in ${templateId.toUpperCase()}-style resumes. 

Current resume context:
${JSON.stringify(resumeData, null, 2)}

The user is currently editing the "${fieldName}" field with this content:
"${fieldValue}"

Your task: Provide an improved version of this field that:
1. Matches ${templateId.toUpperCase()}-style writing: ${styleGuide}
2. Uses strong action verbs and quantifiable achievements where applicable
3. Is concise, clear, and ATS-friendly
4. Follows professional resume best practices
5. Is structured with proper sentences and formatting

IMPORTANT: 
- Return ONLY the improved content, no explanations
- Keep it professional and ready to use
- Match the style of ${templateId.toUpperCase()} company culture
- Use proper grammar and professional tone
- If it's a list/bullet points, format it clearly

Field: ${fieldName}
Original content: "${fieldValue}"

Improved content:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error('Error suggesting resume content:', error);
    throw new Error('Failed to generate suggestion: ' + error.message);
  }
}

module.exports = { analyzeResume, chatAboutResume, suggestResumeContent };

