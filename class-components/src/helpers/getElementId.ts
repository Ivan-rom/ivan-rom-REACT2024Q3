export function getElementId(url: string) {
  const urlElements = url.split('/');
  return urlElements[urlElements.length - 2];
}
