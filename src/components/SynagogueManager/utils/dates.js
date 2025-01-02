export function isToday(dateString) {
  const today = new Date();
  const date = new Date(dateString);
  
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
}

export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('he-IL');
}

export function getDaysSince(dateString) {
  const date = new Date(dateString);
  const today = new Date();
  const diffTime = Math.abs(today - date);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
