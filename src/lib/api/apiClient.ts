interface ApiClientOptions<TBody = unknown> {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: TBody;
  headers?: Record<string, string>;
}

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly url: string,
    public readonly responseBody: string
  ) {
    super(`HTTP ${status}: ${responseBody}`);
    this.name = 'ApiError';
  }
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === 'object' && value !== null && value.constructor === Object
  );
}

export async function apiClient<TResponse = unknown, TBody = unknown>(
  url: string,
  { method = 'GET', body, headers = {} }: ApiClientOptions<TBody> = {}
) {
  try {
    const config: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    //TODO add support blob
    if (method !== 'GET' && body !== undefined) {
      config.body = isPlainObject(body)
        ? JSON.stringify(body)
        : (body as string);
    }

    const response = await fetch(url, config);

    if (!response.ok) {
      const text = await response.text();
      throw new ApiError(response.status, url, text);
    }

    const data = await response.json();
    return data as TResponse;
  } catch (error) {
    if (!(error instanceof ApiError && error.status === 404)) {
      console.error('API Client Error:', url);
      console.error('Error stack', error);
    }

    throw error;
  }
}
