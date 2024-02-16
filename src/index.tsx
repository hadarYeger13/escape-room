import React from 'react';
import { createRoot } from 'react-dom/client';
import { Puzzle1 } from "./Puzzle1";

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<Puzzle1/>);