const geminiClient = require('./geminiClient');

async function matchJobDescription(resumeText, jobDescription) {
  try {
    const { GoogleGenerativeAI } = require('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy-key');
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    
    const prompt = `You are a job matching expert. Compare the following resume with a job description and provide:

1. Match Score (0-100)
2. Matching skills
3. Missing qualifications
4. Recommendations to improve fit

Resume:
${resumeText}

Job Description:
${jobDescription}

Return a JSON response with this structure:
{
  "matchScore": 85,
  "matchingSkills": ["skill1", "skill2..."],
  "missingQualifications": ["qual1", "qual2..."],
  "recommendations": ["rec1", "rec2..."]
}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    return {
      matchScore: 0,
      matchingSkills: [],
      missingQualifications: [],
      recommendations: []
    };
  } catch (error) {
    console.error('Error matching job description:', error);
    throw new Error('Failed to match job description: ' + error.message);
  }
}

module.exports = { matchJobDescription };

