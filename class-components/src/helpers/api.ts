export async function fetchData(url: string) {
  const response = await fetch(url);
  const data = await response.json();

  if (data.detail === 'Not found') throw new Error('Invalid request');

  return data;
}
