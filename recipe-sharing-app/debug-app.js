// Debug script to identify the issue
// Run this in the browser console to check for errors

console.log('=== Recipe App Debug Script ===');

// Check if React is loaded
console.log('React version:', React?.version || 'Not found');
console.log('React Router version:', window.ReactRouter?.version || 'Not found');

// Check for JavaScript errors
window.addEventListener('error', (event) => {
  console.error('JavaScript Error:', event.error);
  console.error('Error details:', {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    error: event.error
  });
});

// Check for unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled Promise Rejection:', event.reason);
});

// Check if the root element exists
const rootElement = document.getElementById('root');
console.log('Root element:', rootElement);
console.log('Root element children:', rootElement?.children);

// Check for any console errors
const originalError = console.error;
console.error = function(...args) {
  console.log('Console Error Detected:', args);
  originalError.apply(console, args);
};

console.log('Debug script loaded. Check the console for any errors above.');

