export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
}

export function requestNotificationPermission() {
  if ('Notification' in window) {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted');
      }
    });
  }
}

export function showNotification(title: string, options: NotificationOptions) {
  if ('Notification' in window && Notification.permission === 'granted') {
    const notification = new Notification(title, options);
    
    notification.onclick = () => {
      window.focus();
      notification.close();
    };

    return notification;
  }
  return null;
}
