const notificationRootId = "notification-root";

function ensureNotificationRoot() {
  let root = document.getElementById(notificationRootId);
  if (!root) {
    root = document.createElement("div");
    root.id = notificationRootId;
    root.setAttribute("aria-live", "polite");
    document.body.append(root);
  }
  return root;
}

function buildNotification(message, variant) {
  const element = document.createElement("div");
  element.className = `notification notification--${variant}`;
  element.textContent = message;

  return element;
}

function showNotification(message) {
  const root = ensureNotificationRoot();
  const notification = buildNotification(message, "error");
  root.append(notification);
  
  const dismiss = 1700;

  window.setTimeout(() => element.remove, dismiss);
}
