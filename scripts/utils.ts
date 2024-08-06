const dumpFolder = "./dump/dump.json";

export async function dumpDevnet() {
  const url = `http://127.0.0.1:5050/dump`;
  const headers = { "Content-Type": "application/json" };
  const payload = { path: dumpFolder };
  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(
      `HTTP error! calling ${url} Status: ${response.status} Message: ${await response.text()}`,
    );
  }
}
