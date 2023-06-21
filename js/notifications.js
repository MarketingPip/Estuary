/// Estuary Notification System

const notificationQueue = [];
let isProcessingQueue = false;

function showNotification(icon, title, text, background) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.innerHTML =  `<id class="checkicon"><b>${title}</b> <i class="${icon}"></i> </id><p>${text}</p>`

  document.body.appendChild(notification);

  return new Promise(resolve => {
    setTimeout(() => {
      notification.classList.add('show');
      setTimeout(() => {
        document.body.removeChild(notification);
        resolve();
      }, 500);
    }, 5000);
  });
}

function enqueueNotification(icon, title, text, background) {
  notificationQueue.push(icon, title, text, background);
  processNotificationQueue();
}

async function processNotificationQueue(icon, title, text, background)  {
  if (isProcessingQueue) {
    return;
  }

  isProcessingQueue = true;

  while (notificationQueue.length > 0) {
    const text = notificationQueue.shift();
    await showNotification(text) ;
  }

  isProcessingQueue = false;
}

document.querySelector('button').addEventListener('click', enqueueNotification);
