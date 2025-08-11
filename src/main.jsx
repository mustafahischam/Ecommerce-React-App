import * as React from "react";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { HeroUIProvider } from '@heroui/react'
import App from './App.jsx'
import CounterContextProvider from './Context/CounterContext.jsx'
import AuthContextProvider from './Context/AuthContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeroUIProvider>
      <CounterContextProvider>
        <AuthContextProvider>
      <App />
      </AuthContextProvider>
      </CounterContextProvider>
    </HeroUIProvider>
  </StrictMode>,
)
