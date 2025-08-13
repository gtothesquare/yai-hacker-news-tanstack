interface ApiClientOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: BodyInit;
}

export async function apiClient(
  url: string,
  { method, body }: ApiClientOptions = { method: 'GET' }
) {
  try {
    let response: Response;
    if (method === 'GET') {
      response = await fetch(url);
    } else {
      response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
    }

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    const err = error as Error;
    if ('message' in err) {
      console.error(err?.message);
    } else {
      console.error(err);
    }
  }
}
