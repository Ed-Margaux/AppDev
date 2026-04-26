import BASE_URL from '../../config';

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

export async function authLogin({ email, password }) {
  const response = await fetch(BASE_URL + '/login', {
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
  const response = await fetch(BASE_URL + '/register', {
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