# Lexi Legal Assistant Frontend

Live Url: https://lexisg-frontend.netlify.app/

A modern legal assistant interface built with React, Vite, and Tailwind CSS. This application simulates a ChatGPT-like interface for legal queries with proper citation handling and PDF document linking.

## Features

- **ChatGPT-like Interface**: Clean, modern chat interface for legal queries
- **Citation Support**: Clickable citations with source attribution
- **PDF Integration**: Modal popup for viewing cited documents
- **Loading States**: Smooth loading animations and states
- **Responsive Design**: Works on desktop and mobile devices
- **Simulated API**: No backend required, uses mock data

## Demo Query

Try asking this sample question:

```
In a motor accident claim where the deceased was self-employed and aged 54–55 years at the time of death, is the claimant entitled to an addition towards future prospects in computing compensation under Section 166 of the Motor Vehicles Act, 1988? If so, how much?
```

## Tech Stack

- **React 19.1.0** - Frontend framework
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icons
- **React PDF** - PDF handling (for future enhancement)

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/shaik-gafoor/Lexisg-frontend-intern-test.git
cd Lexisg-frontend-intern-test
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## How Citation Linking Works

1. **User Input**: Users type their legal question in the textarea
2. **Simulated API**: The app simulates an API call with a 1.5-second delay
3. **Response Display**: The answer is displayed in a chat bubble with citations below
4. **Citation Interaction**: Users can click on any citation to open a modal
5. **PDF Modal**: The modal shows:
   - Citation source and paragraph information
   - Highlighted citation text
   - Link to open the original PDF document
   - Simulated PDF preview area

## Project Structure

```
src/
├── App.jsx          # Main application component
├── index.css        # Tailwind CSS imports
└── main.jsx         # React entry point
```

## Key Components

### Main App Component

- Handles state management for conversation, loading, and PDF modal
- Implements the chat interface with user/assistant messages
- Manages citation clicking and PDF modal display

### Citation System

- Each citation includes text, source, paragraph, and link
- Clickable citations open in a modal overlay
- External link integration for PDF documents

### Responsive Design

- Mobile-first approach with Tailwind CSS
- Responsive layout that works on all screen sizes
- Proper spacing and typography

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or support, please email: gafoor7898@gmail.com
