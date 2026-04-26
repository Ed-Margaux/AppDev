const BASE_URL = 'http://127.0.0.1:8000/api';
const REQUEST_TIMEOUT_MS = 15000;

const options = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

async function readJsonOrText(response) {
  const contentType = response.headers?.get?.('content-type') || '';
  if (contentType.includes('application/json')) {
    return await response.json();
  }
  const text = await response.text();
  return { message: text };
}

async function fetchWithTimeout(url, requestOptions) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    return await fetch(url, {
      ...requestOptions,
      signal: controller.signal,
    });
  } catch (error) {
    if (error?.name === 'AbortError') {
      throw new Error(
        'Request timed out. Please check if TeachMe server is running and try again.',
      );
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function authLogin({ email, password }) {
  const response = await fetchWithTimeout(BASE_URL + '/login', {
    method: 'POST',
    ...options,
    body: JSON.stringify({ email, password }),
  });

  const data = await readJsonOrText(response);

  if (response.ok) {
    return data;
  } else {
    throw new Error(
      data?.message ||
        data?.error ||
        `Login failed (${response.status}${response.statusText ? ` ${response.statusText}` : ''})`,
    );
  }
}

export async function authRegister(payload) {
  const response = await fetchWithTimeout(BASE_URL + '/register', {
    method: 'POST',
    ...options,
    body: JSON.stringify(payload),
  });

  const data = await readJsonOrText(response);

  if (response.ok) {
    return data;
  } else {
    throw new Error(
      data?.message ||
        data?.error ||
        `Registration failed (${response.status}${response.statusText ? ` ${response.statusText}` : ''})`,
    );
  }
}