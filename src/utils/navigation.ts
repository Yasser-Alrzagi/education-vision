/**
 * Safe external navigation helper that avoids direct window.open calls
 * which can be blocked or cause errors in sandboxed iframes.
 */
export function openExternalUrl(url: string) {
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
