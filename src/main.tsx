import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './app/styles/index.module.scss'

import { apiSlice } from './entities/todos/api/apiSlice.ts'
import { ApiProvider } from '@reduxjs/toolkit/query/react';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApiProvider api={apiSlice}>
      <App />
    </ApiProvider>
  </React.StrictMode>,
)
