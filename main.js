// main.js

// Defer loading of large, non-critical images (e.g., background blur)
window.addEventListener('DOMContentLoaded', () => {
  const bg = document.querySelector('.background-blur');
  if (bg) {
    bg.style.backgroundImage = 'url("background.jpg")';
  }
});

// Use requestIdleCallback for non-critical JS execution
function runWhenIdle(fn) {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(fn, { timeout: 400 });
  } else {
    setTimeout(fn, 200);
  }
}

// Example: Preconnect to CDN origins or API domains
function preconnectUrls() {
  const urls = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com'
    // Add other preconnect links if used
  ];
  urls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = url;
    document.head.appendChild(link);
  });
}
runWhenIdle(preconnectUrls);

// Minimize layout thrashing: batch DOM reads and writes
function batchDOMUpdates(updates) {
  requestAnimationFrame(() => {
    updates.forEach(fn => fn());
  });
}

// Optionally, remove event listeners or unused nodes after init
runWhenIdle(() => {
  document.querySelectorAll('*').forEach(node => {
    if (node.childNodes) {
      node.childNodes.forEach(child => {
        if (child.nodeType === 8 /* comment node type */) {
          node.removeChild(child);
        }
      });
    }
  });
});

// Disable right-click context menu across the entire document
document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
  return false;
});