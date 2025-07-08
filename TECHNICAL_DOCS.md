# Technical Documentation - Lexi Legal Assistant

## Architecture Overview

The Lexi Legal Assistant is built using a modern React architecture with the following key components:

### Core Technologies

- **React 19.1.0** - Modern React with hooks and function components
- **Vite 7.0.3** - Fast build tool and development server
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Lucide React** - Clean, customizable icons

### Component Structure

```
src/
├── App.jsx                 # Main application component
├── components/
│   └── PdfModal.jsx       # Modal component for PDF preview
├── hooks/
│   └── useKeyboardShortcuts.js # Custom hook for keyboard shortcuts
├── index.css              # Tailwind CSS imports
└── main.jsx               # React entry point
```

## Key Features Implementation

### 1. ChatGPT-like Interface

- **Conversation State**: Uses React state to maintain conversation history
- **Message Types**: Supports user and assistant message types
- **Auto-scroll**: Automatically scrolls to latest message
- **Loading States**: Shows typing indicator during API simulation

### 2. Citation System

- **Clickable Citations**: Each citation is clickable and opens in a modal
- **Source Attribution**: Shows document source and paragraph reference
- **External Links**: Direct links to original PDF documents
- **Hover Effects**: Visual feedback on citation interaction

### 3. PDF Modal Integration

- **Modal Overlay**: Full-screen modal with backdrop
- **Document Preview**: Simulated PDF content with highlighted citations
- **Download Functionality**: Option to download original PDF
- **Keyboard Navigation**: ESC key to close modal

### 4. Keyboard Shortcuts

- **Ctrl+Enter**: Send message
- **Ctrl+K**: Clear conversation
- **Esc**: Close modal
- **Custom Hook**: `useKeyboardShortcuts` for easy shortcut management

### 5. Responsive Design

- **Mobile-first**: Designed for mobile devices first
- **Flexible Layout**: Adapts to different screen sizes
- **Touch-friendly**: Optimized for touch interactions

## State Management

The application uses React's built-in state management:

```javascript
const [query, setQuery] = useState(""); // Current user input
const [isLoading, setIsLoading] = useState(false); // Loading state
const [conversation, setConversation] = useState([]); // Chat history
const [showPdfModal, setShowPdfModal] = useState(false); // Modal visibility
const [selectedCitation, setSelectedCitation] = useState(null); // Selected citation
```

## API Simulation

The application simulates an API call with:

- **Delay**: 1.5 second delay to mimic real API response
- **Mock Data**: Predefined response with answer and citations
- **Error Handling**: Basic error states (can be extended)

```javascript
const simulatedResponse = {
  answer: "Legal answer text...",
  citations: [
    {
      id: 1,
      text: "Citation text...",
      source: "Document source",
      paragraph: "Para 7",
      link: "https://...",
    },
  ],
};
```

## Styling Approach

### Tailwind CSS Classes

- **Layout**: `flex`, `grid`, `space-x-*`, `space-y-*`
- **Colors**: `bg-gray-50`, `text-gray-900`, `border-gray-200`
- **Interactions**: `hover:bg-gray-100`, `focus:ring-2`, `transition-colors`
- **Responsive**: `max-w-4xl`, `mx-auto`, `px-4`

### Custom Animations

- **Bounce Animation**: Loading dots with staggered delays
- **Hover Effects**: Smooth transitions on interactive elements
- **Focus States**: Clear visual feedback for accessibility

## Performance Optimizations

### React Optimizations

- **useRef**: Direct DOM access for textarea and scroll behavior
- **useEffect**: Efficient side effect management
- **Event Handlers**: Optimized event handling for keyboard shortcuts

### Loading States

- **Skeleton Loading**: Animated dots during API simulation
- **Button States**: Disabled states during loading
- **Form Validation**: Prevents empty submissions

## Accessibility Features

### Keyboard Navigation

- **Tab Order**: Proper tab sequence through interactive elements
- **Keyboard Shortcuts**: Power user shortcuts for efficiency
- **Focus Management**: Clear focus indicators

### Screen Reader Support

- **ARIA Labels**: Proper labeling for screen readers
- **Semantic HTML**: Correct HTML structure
- **Alt Text**: Descriptive text for icons
