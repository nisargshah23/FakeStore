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
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Social Post Generator
          </h1>
          <p className="text-gray-600">
            Generate posts for LinkedIn, Twitter, and Instagram
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          
          {/* Topic Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Topic
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter your topic (e.g., Remote Work, AI Technology)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Platform Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Platform
            </label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Generating...' : 'Generate Post'}
          </button>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
        </div>

        {/* Generated Post */}
        {generatedPost && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Generated Post</h3>
                <p className="text-sm text-gray-600">Platform: {platform}</p>
              </div>
              <button
                onClick={copyToClipboard}
                className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md text-sm"
              >
                Copy
              </button>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md border">
              <pre className="whitespace-pre-wrap text-gray-800 text-sm">
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