import 'uno.css';
import { render } from 'preact';
import { ClockFace } from 'ClockFace';

const root = document.querySelector('#root');
if (root) render(<ClockFace />, root);
else throw new Error('#root element not found!');
