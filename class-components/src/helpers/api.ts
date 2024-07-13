export async function getData(url: string) {
  const data = await fetch(url)
    .then((res) => res.json())
    .then((res) => {
      if (res.detail === 'Not found') throw new Error('Invalid request');
      return res;
    });
  return data;
}
