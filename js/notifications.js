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
  element.className = `notification notification-${variant}`;
  element.textContent = message;
  return element;
}

export function showErrorNotification(message) {
  const root = ensureNotificationRoot();
  const element = buildNotification(message, "error");
  root.append(element);

  const dismiss = 1700;

  window.setTimeout(() => element.remove(), dismiss);
}

export function showSuccessNotification(message) {
  const root = ensureNotificationRoot();
  const element = buildNotification(message, "success");
  root.append(element);

  const dismiss = 1700;
  window.setTimeout(() => element.remove(), dismiss);
}
