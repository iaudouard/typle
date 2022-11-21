export function setLS(key: string, value: any) {
  return localStorage.setItem(key, JSON.stringify(value));
}

export function getLS(key: string) {
  if (window.localStorage.getItem(key)) {
    return localStorage.getItem(key);
  }
  return undefined;
}
