# AvatarX

A full-stack web application that generates 3D models from text prompts and images using AI. Built with FastAPI backend and Next.js frontend, featuring real-time 3D visualization and interactive chat interface.

## ✨ Features

- **Text-to-3D**: Generate 3D models from descriptive text prompts
- **Image-to-3D**: Convert any image into a 3D model
- **Human Avatar Generation**: Create 3D avatars from human photos with intelligent detection
- **Interactive 3D Viewer**: Real-time 3D model visualization with controls
- **Chat Interface**: Conversational UI for seamless interaction
- **Authentication**: Secure user authentication with Clerk
- **Real-time Processing**: Live generation status and progress tracking

## 🏗️ Architecture

### Backend (FastAPI)
- **Framework**: FastAPI with async/await support
- **AI Models**: 
  - Shap-E (OpenAI) for 3D model generation
  - Gemini API for image analysis and description
- **3D Processing**: PLY format output with mesh optimization
- **CORS**: Configured for cross-origin requests

### Frontend (Next.js)
- **Framework**: Next.js 14 with App Router
- **UI**: React components with Tailwind CSS
- **3D Rendering**: Three.js with React Three Fiber
- **Authentication**: Clerk integration
- **State Management**: React hooks and context

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- Node.js 18+
- CUDA-compatible GPU (recommended for faster processing)

### Environment Variables

Create `.env` files in both backend and frontend directories:

#### Backend `.env`
```bash
GEMINI_KEY=your_gemini_api_key_here
```

#### Frontend `.env.local`
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Create virtual environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Create required directories**:
   ```bash
   mkdir uploads 3dmodels
   ```

5. **Start the server**:
   ```bash
   uvicorn app:app --reload --host 0.0.0.0 --port 8000
   ```

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**:
   Navigate to `http://localhost:3000`

## 🔧 API Endpoints

### Backend Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/upload-human-image/` | POST | Generate 3D avatar from human photo |
| `/upload-image/` | POST | Convert any image to 3D model |
| `/generate-3d-model/{request}` | POST | Generate 3D model from text prompt |

### Frontend API Routes

| Route | Description |
|-------|-------------|
| `/api/upload-human-image` | Proxy for human avatar generation |
| `/api/upload-image` | Proxy for image-to-3D conversion |
| `/api/generate-3d-model` | Proxy for text-to-3D generation |

## 🎮 Usage

### Text-to-3D Generation
1. Enter a descriptive prompt in the chat input
2. Click send or press Enter
3. Wait for the AI to generate your 3D model
4. Interact with the model using the 3D viewer controls

### Image-to-3D Conversion
1. Click "Image to 3D" button
2. Upload an image file
3. The system will analyze and convert it to 3D
4. View and interact with the generated model

### Human Avatar Creation
1. Click "Human Avatar" button
2. Upload a photo of a person
3. The AI will detect if it's human and create an avatar
4. Receive a personalized 3D avatar

## 🔍 3D Viewer Features

- **Orbit Controls**: Click and drag to rotate
- **Zoom**: Mouse wheel to zoom in/out
- **Pan**: Right-click and drag to pan
- **Wireframe Mode**: Toggle wireframe view
- **Vertex Colors**: Show/hide model colors
- **Performance Stats**: Monitor rendering performance

## 🛠️ Technologies Used

### Backend
- **FastAPI**: Modern Python web framework
- **Shap-E**: OpenAI's 3D generation model
- **Gemini API**: Google's multimodal AI
- **PyTorch**: Deep learning framework
- **Diffusers**: Hugging Face's diffusion models

### Frontend
- **Next.js**: React framework with SSR
- **Three.js**: 3D graphics library
- **React Three Fiber**: React renderer for Three.js
- **Clerk**: Authentication and user management
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives

## 🔒 Security Features

- **Authentication**: Clerk-based user authentication
- **File Validation**: Server-side file type checking
- **CORS Configuration**: Proper cross-origin request handling
- **Input Sanitization**: Safe handling of user inputs

## 📄 License

UNLICENSED

## 🙏 Acknowledgments

- **OpenAI** for the Shap-E model
- **Google** for the Gemini API
- **Hugging Face** for the Diffusers library
- **Three.js** community for 3D rendering tools
- **Vercel** for the Next.js framework

---

Built with ❤️ using modern AI and web technologies