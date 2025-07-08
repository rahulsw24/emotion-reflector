# Simple Emotion Reflection Tool

A modern, mobile-first web app where users can reflect on their feelings, and receive an AI-powered emotion analysis in response.

Built as part of an internship assignment — with extra enhancements using Hugging Face emotion classification API.



## ✨ Features

- 📝 Input reflection text via a clean textarea
- ⚙️ FastAPI backend with live Hugging Face NLP integration
- 💡 Returns emotion label (e.g., _joy_, _fear_) with confidence
- 💻 TypeScript + React frontend with Tailwind CSS UI
- 📱 Fully responsive, mobile-first design
- ✅ Graceful error and loading states



## 🔧 Tech Stack

### Frontend

- React (TypeScript)
- Tailwind CSS

### Backend

- Python + FastAPI
- Hugging Face Transformers API (`j-hartmann/emotion-english-distilroberta-base`)
- `httpx` for async HTTP requests
- `python-dotenv` for secret management

---

## 📦 Folder Structure

    emotion-reflection/
    ├── backend/
    │ ├── main.py
    │ ├── .env
    │ └── requirements.txt
    └── frontend/
    ├── src/
    │ ├── App.tsx
    │ └── index.css
    └── tailwind.config.js

---

## 🚀 Getting Started

### 🔙 Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment
   ```bash
   python -m venv venv
   source venv/bin/activate   # Windows: venv\Scripts\activate
   ```
3. Install dependencies
   ```bash
   pip install -r requirements.txt
   ```
4. Create a .env file with your Hugging Face API key:
   ```ini
   HF_API_KEY=your_huggingface_token_here
   ```
5. Run the FastAPI server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```

### Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React develoment server:
   ```bash
   npm run dev
   ```
4. Visit http://localhost:5173

## 🧪 Testing the API (Optional)

Visit FastAPI Swagger Docs at:
👉 http://localhost:8000/docs

You can test the /analyze POST endpoint manually there.

## 🧠 Example Input/Output

### Input

    ```json
    { 
        "text": "I'm nervous about my interview." 
    }
    ```

### Output

    ```json
    {
        "emotion": "fear", "confidence": 0.99
    }
    ```

## 🎥 Walkthrough Video

If you recorded a Loom video, link it here.

## Contact

Made by Rahul Swarup
https://github.com/rahulsw24
