var keyPressCount = 0;
var consoleVisible = false;
var logBuffer = [];
var consoleContainer; // Define consoleContainer at the top

var safeStringify = function (obj) {
  var cache = [];
  var str = JSON.stringify(obj, function (key, value) {
    if (typeof value === 'object' && value !== null) {
      if (cache.indexOf(value) !== -1) {
        // Circular reference found, discard key
        return;
      }
      // Store value in cache
      cache.push(value);
    }
    return value;
  }, 2);
  cache = null; // Enable garbage collection
  return str;
};

var logMessage = function (type, message, style) {
  var messageElement = document.createElement('div');
  messageElement.style.padding = '2px 0';
  messageElement.style.borderBottom = '1px solid #333';
  messageElement.style.marginBottom = '2px';

  switch (type) {
    case 'LOG':
      messageElement.style.color = '#00ff00';
      break;
    case 'WARN':
      messageElement.style.color = '#ffcc00';
      break;
    case 'ERROR':
      messageElement.style.color = '#ff0000';
      break;
    case 'INFO':
      messageElement.style.color = '#00ccff';
      break;
    case 'EXCEPTION':
      messageElement.style.color = '#ff00ff';
      break;
    default:
      messageElement.style.color = 'white';
  }

  if (typeof message === 'object') {
    message = safeStringify(message);
  }

  if (style) {
    messageElement.style.cssText += style;
  }

  messageElement.textContent = '[' + type + '] ' + message;
  consoleContainer.appendChild(messageElement);
  consoleContainer.scrollTop = consoleContainer.scrollHeight;
};

var bufferLogMessage = function (type, message, style) {
  logBuffer.push({ type: type, message: message, style: style });
  if (consoleVisible) {
    logMessage(type, message, style);
  }
};

var originalConsole = {
  log: console.log,
  warn: console.warn,
  error: console.error,
  info: console.info
};

console.log = function (message) {
  var style = '';
  if (arguments.length > 1 && typeof arguments[1] === 'string') {
    style = arguments[1];
  }
  originalConsole.log.apply(console, arguments);
  bufferLogMessage('LOG', message, style);
};

console.warn = function (message) {
  var style = '';
  if (arguments.length > 1 && typeof arguments[1] === 'string') {
    style = arguments[1];
  }
  originalConsole.warn.apply(console, arguments);
  bufferLogMessage('WARN', message, style);
};

console.error = function (message) {
  var style = '';
  if (arguments.length > 1 && typeof arguments[1] === 'string') {
    style = arguments[1];
  }
  originalConsole.error.apply(console, arguments);
  bufferLogMessage('ERROR', message, style);
};

console.info = function (message) {
  var style = '';
  if (arguments.length > 1 && typeof arguments[1] === 'string') {
    style = arguments[1];
  }
  originalConsole.info.apply(console, arguments);
  bufferLogMessage('INFO', message, style);
};

window.addEventListener('error', function (event) {
  bufferLogMessage('EXCEPTION', event.message);
});

document.addEventListener('DOMContentLoaded', function () {
  var developerDiv = document.getElementById('developer');
  if (!developerDiv) {
    console.error('Developer div not found');
    return;
  }

  consoleContainer = document.createElement('div'); // Initialize consoleContainer here
  consoleContainer.style.direction = 'ltr';
  consoleContainer.style.position = 'fixed';
  consoleContainer.style.bottom = '0';
  consoleContainer.style.left = '0';
  consoleContainer.style.width = '100%';
  consoleContainer.style.height = '200px';
  consoleContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
  consoleContainer.style.color = 'white';
  consoleContainer.style.overflowY = 'scroll';
  consoleContainer.style.display = 'none';
  consoleContainer.style.zIndex = '10000';
  consoleContainer.style.fontFamily = 'monospace';
  consoleContainer.style.padding = '10px';
  consoleContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
  consoleContainer.style.borderTop = '2px solid #444';
  developerDiv.appendChild(consoleContainer);

  window.addEventListener('keydown', function (event) {
    if (event.key === '0') {
      keyPressCount++;
      if (keyPressCount === 4) {
        consoleVisible = !consoleVisible;
        consoleContainer.style.display = consoleVisible ? 'block' : 'none';
        if (consoleVisible) {
          logBuffer.forEach(function (log) {
            logMessage(log.type, log.message, log.style);
          });
        }
        keyPressCount = 0;
      }
    } else {
      keyPressCount = 0;
    }
  });
});
