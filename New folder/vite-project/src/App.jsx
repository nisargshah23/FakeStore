import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const App = () => {
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState('LinkedIn');
  const [generatedPost, setGeneratedPost] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const platforms = ['LinkedIn', 'Twitter', 'Instagram'];

  const generatePrompt = (platform, topic) => {
    const prompts = {
      LinkedIn: `Write a professional LinkedIn post for the topic: '${topic}'. Keep it concise and engaging.`,
      Twitter: `Write a Twitter post for the topic: '${topic}'. Keep it under 280 characters and engaging.`,
      Instagram: `Write an Instagram caption for the topic: '${topic}'. Make it engaging with emojis and hashtags.`
    };
    return prompts[platform];
  };

  const generatePost = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic');
      return;
    }

    const apiKey = "AIzaSyAUPiGQ7saCv7BVaeH1BnSUNbHwptaAugE"
    if (!apiKey) {
      setError('Please add your Gemini API key to the .env.local file');
      return;
    }

    setLoading(true);
    setError('');
    setGeneratedPost('');

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = generatePrompt(platform, topic);
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const generatedText = response.text();

      setGeneratedPost(generatedText);
    } catch (err) {
      console.error('Error generating post:', err);
      setError('Failed to generate post. Please check your API key and try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPost);
    alert('Post copied to clipboard!');
  };

  return (
    <div >
      <div >
        
        {/* Header */}
        <div >
          <h1 >
            Social Post Generator
          </h1>
          <p >
            Generate posts for LinkedIn, Twitter, and Instagram
          </p>
        </div>

        {/* Form */}
        <div >
          
          {/* Topic Input */}
          <div >
            <label >
              Topic
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter your topic (e.g., Remote Work, AI Technology)"
              />
          </div>

          {/* Platform Selection */}
          <div >
            <label >
              Platform
            </label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              >
              {platforms.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Generate Button */}
          <button
            onClick={generatePost}
            disabled={loading || !topic.trim()}
           >
            {loading ? 'Generating...' : 'Generate Post'}
          </button>

          {/* Error Message */}
          {error && (
            <div>
              {error}
            </div>
          )}
        </div>

        {/* Generated Post */}
        {generatedPost && (
          <div >
            <div >
              <div>
                <h3 >Generated Post</h3>
                <p >Platform: {platform}</p>
              </div>
              <button
                onClick={copyToClipboard}
                
              >
                Copy
              </button>
            </div>
            
            <div >
              <pre >
                {generatedPost}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;