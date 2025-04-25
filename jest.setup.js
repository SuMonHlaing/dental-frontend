require('@testing-library/jest-dom');
import { server } from './mocks/server';

jest.mock('../store/authStore');


if (typeof global.TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('util');
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock React Router's useNavigate if it's causing issues in tests
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  Link: jest.fn().mockImplementation(({ children }) => children),
}));

// jest.setup.js
// require('@testing-library/jest-dom');

// if (typeof global.TextEncoder === 'undefined') {
//   const { TextEncoder, TextDecoder } = require('util');
//   global.TextEncoder = TextEncoder;
//   global.TextDecoder = TextDecoder;
// }

// // Polyfill for TextEncoder and TextDecoder
// import { TextEncoder, TextDecoder } from 'util';

// global.TextEncoder = TextEncoder;
// global.TextDecoder = TextDecoder;

// // Optional: Add custom mocks for libraries, e.g., React Router, if needed

// // Mock React Router's useNavigate if it's causing issues in tests
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: jest.fn(),
//   Link: jest.fn().mockImplementation(({ children }) => children),
// }));

// // Optional: Mock other libraries or features globally as needed
