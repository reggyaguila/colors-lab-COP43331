const fetch = require('node-fetch');

const apiBaseUrl = process.env.API_BASE_URL || 'http://127.0.0.1:8000';

test('AddColor API returns no error for valid input', async () => {
  const response = await fetch(`${apiBaseUrl}/AddColor.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      color: `Blue-${Date.now()}`,
      userId: '1'
    })
  });

  expect(response.status).toBe(200);

  const data = await response.json();

  expect(data.error).toBe('');
});
