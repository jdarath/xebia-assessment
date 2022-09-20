import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./App.js";

const container = document.getElementById('root'),
      root = createRoot(container);

root.render(<App />);