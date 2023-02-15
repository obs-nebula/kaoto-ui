import App from './App';
import { createRoot } from 'react-dom/client';

import webTracer from './webTracer';

webTracer();

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(<App />);

