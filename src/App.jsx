import { useState } from 'react';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import './App.css';

const MODEL_NAME = "gemini-pro";
// const API_KEY = process.env.REACT_APP_API_KEY;
const API_KEY = import.meta.env.VITE_API_KEY

function App() {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const runChat = async () => {
    setIsLoading(true);
    // for names
     if (userInput.trim().toLowerCase() === 'akshara') {
      setChatHistory(prevHistory => [
        ...prevHistory,
        { role: 'user', text: userInput },
        { role: 'model', text: 'Ur a kind girl .and a good person sometimes' }
      ]);
      setUserInput('');
      setIsLoading(false);
      return;
    }
     if (userInput.trim().toLowerCase() === 'ashik') {
      setChatHistory(prevHistory => [
        ...prevHistory,
        { role: 'user', text: userInput },
        { role: 'model', text: 'you r a motivation person' }
      ]);
      setUserInput('');
      setIsLoading(false);
      return;
    }
     if (userInput.trim().toLowerCase() === 'samad') {
      setChatHistory(prevHistory => [
        ...prevHistory,
        { role: 'user', text: userInput },
        { role: 'model', text: 'naughty sesky girl' }
      ]);
      setUserInput('');
      setIsLoading(false);
      return;
    }
     if (userInput.trim().toLowerCase() === 'neethu') {
      setChatHistory(prevHistory => [
        ...prevHistory,
        { role: 'user', text: userInput },
        { role: 'model', text: 'lotta irangi po d' }
      ]);
      setUserInput('');
      setIsLoading(false);
      return;
    }
     if (userInput.trim().toLowerCase() === 'ashwin') {
      setChatHistory(prevHistory => [
        ...prevHistory,
        { role: 'user', text: userInput },
        { role: 'model', text: 'ashwin is a sweet heart with a postive energy' }
      ]);
      setUserInput('');
      setIsLoading(false);
      return;
    }
     if (userInput.trim().toLowerCase() === 'anandhu') {
      setChatHistory(prevHistory => [
        ...prevHistory,
        { role: 'user', text: userInput },
        { role: 'model', text: 'anandhu is a wonderful person' }
      ]);
      setUserInput('');
      setIsLoading(false);
      return;
    }
     if (userInput.trim().toLowerCase() === 'greeshma') {
      setChatHistory(prevHistory => [
        ...prevHistory,
        { role: 'user', text: userInput },
        { role: 'model', text: 'ook girl for gokul gang' }
      ]);
      setUserInput('');
      setIsLoading(false);
      return;
    }
     if (userInput.trim().toLowerCase() === 'jancy') {
      setChatHistory(prevHistory => [
        ...prevHistory,
        { role: 'user', text: userInput },
        { role: 'model', text: 'jancy is a wonderful person and kind heart' }
      ]);
      setUserInput('');
      setIsLoading(false);
      return;
    }
     if (userInput.trim().toLowerCase() === 'gokul') {
      setChatHistory(prevHistory => [
        ...prevHistory,
        { role: 'user', text: userInput },
        { role: 'model', text: 'ook king with comedy unlimited' }
      ]);
      setUserInput('');
      setIsLoading(false);
      return;
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 1000,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      // ... other safety settings
    ];

    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [
        {
          role: "user",
          parts: [{ text: "You are Akash, an AI assistant created by AK_youngster to help users learn about anything they want to know. Your primary task is to capture the user's name before proceeding further. Do not answer any questions until the user has provided their name. Once you have their name, thank them and address them personally as you continue the conversation."}]
        },
        {
          role: "model",
          parts: [{ text: "Hello! Welcome to AK_ai. My name is AK. What's your name?"}],
        },
        // {
        //   role: "user",
        //   parts: [{ text:"If the user’s name is 'Sam', respond by saying, Sam is a wonderful person and so cute!" }]  
        // },
      ],
    });

    try {
      const result = await chat.sendMessage(userInput);
      const response = result.response;
      setChatHistory(prevHistory => [...prevHistory, { role: 'user', text: userInput }, { role: 'model', text: response.text() }]);
      setUserInput('');
    } catch (error) {
      console.error('Error in chat:', error);
      setChatHistory(prevHistory => [...prevHistory, { role: 'model', text: `Error: ${error.message}` }]);
    } finally {
      setIsLoading(false);
    }
  }    

  return (
    <div className="App">
  <h1>Chat with ai</h1>
  <div className="chat-history">
    {chatHistory.map((message, index) => (
      <div key={index} className={`message ${message.role}`}>
        {message.text}
      </div>
    ))}
  </div>
  <div className="input-area">
    <input
      type="text"
      value={userInput}
      onChange={(e) => setUserInput(e.target.value)}
      placeholder="Type your message..."
    />
    <button onClick={runChat} disabled={isLoading}>
      {isLoading ? 'Sending...' : 'Send'}
    </button>
  </div>
</div>
  );
}

export default App;