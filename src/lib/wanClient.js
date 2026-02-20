let wanApiKey = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_WAN_API_KEY || '' : '';

export function configureWanKey(key) {
  wanApiKey = key;
}

export async function renderInteractiveCut(payload) {
  if (!wanApiKey) {
    throw new Error('Alibaba Wan API key not set. Call configureWanKey(key) first.');
  }

  // Placeholder request. Replace endpoint + payload with actual Wan API contract once we have the key/specs.
  const response = await fetch('https://api.alibaba-wan.example/render', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${wanApiKey}`
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error('Wan render failed');
  }

  return response.json();
}
