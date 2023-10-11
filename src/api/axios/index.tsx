export async function upload(fileArray: File[]) {
  const formData = new FormData();
  for (const file of fileArray) {
    formData.append("file", file);
  }

  const url = new URL(`/files/upload`, process.env.REACT_APP_API_KEY).href;
  const res = await fetch(url, {
    method: "POST",
    body: formData,
  });

  const files = await res.json();
  return files;
}
