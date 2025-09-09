# AI Question Paper Generator

An application for tutors and educators to generate question papers for GSEB classes 5–10. It allows for deep customization of question formats, difficulty levels, subjects, and specific chapters, using the Google Gemini API to generate high-quality questions.

## ✨ Core Features

- **Dynamic Paper Setup**: Configure institution name, total marks, and exam date.
- **Detailed Configuration**: Select standard, subject, medium (English/Gujarati), and difficulty.
- **Multi-Chapter Selection**: Choose one or more chapters to generate questions from.
- **Variety of Question Types**: Specify the exact number of MCQs, Short Answer, Long Answer, Fill in the Blanks, and True/False questions.
- **Live Question Counter**: Get real-time feedback on the total number of questions requested, with a recommended limit for performance.
- **Instant Preview**: See a live preview of the generated question paper.
- **Export Options**: Download the final paper as a **DOCX** file, copy it as plain text, or print it directly to paper or **PDF**.

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS
- **AI**: Google Gemini API (`@google/genai`)

## 🚀 Getting Started

Follow these instructions to set up and run the project on your local machine.

### 1. Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your computer. Version 18 or higher is recommended. You can check your version by running:
```bash
node -v
```

### 2. Installation

1.  **Set Up Project Files**: Place all the project files into a single folder (e.g., `question-paper-generator`).

2.  **Navigate to the Directory**: Open your terminal or command prompt and move into the project folder:
    ```bash
    cd path/to/question-paper-generator
    ```

3.  **Install Dependencies**: Run the following command to install all the necessary packages defined in `package.json`:
    ```bash
    npm install
    ```

### 3. Environment Configuration

The application requires a Google Gemini API key to function.

1.  **Get an API Key**:
    - Visit the [Google AI Studio website](https://aistudio.google.com/).
    - Sign in and click **"Get API key"** to create a new API key.
    - Copy the generated key to your clipboard.

2.  **Create an Environment File**:
    - In the root of your project folder, create a new file named `.env`.

3.  **Add Your API Key**:
    - Open the `.env` file and add the following line, replacing `YOUR_API_KEY_HERE` with the key you copied.
    ```
    VITE_API_KEY=YOUR_API_KEY_HERE
    ```
    > **Important**: The `VITE_` prefix is required for Vite projects. Keep this key private and do not commit the `.env` file to version control.

### 4. Running the Application

Once the installation and configuration are complete, you can start the local development server.

```bash
npm run dev
```

This will launch the application. Your terminal will display a local URL, typically **http://localhost:5173**. Open this URL in your web browser to see the app live. The server supports Hot Module Replacement (HMR), so any changes you make to the code will update in the browser automatically.

## 📦 Available Scripts

In the project directory, you can run:

-   `npm run dev`: Runs the app in development mode.
-   `npm run build`: Bundles the app for production into the `dist` folder.
-   `npm run preview`: Serves the production build locally to preview it before deployment.
