export default async function handler(req, res) {
  // Implement your authentication check manually
  // For example, use a cookie, a header, or a token

  const isAuthenticated = true; // Replace with real logic

  if (isAuthenticated) {
    res.writeHead(302, {
      Location: 'https://drive.google.com/uc?export=download&id=15OjbN8BjvpCTTD5hPk4GJWbdolKg9rgD'
    });
    res.end();
  } else {
    res.status(403).json({ error: 'Unauthorized' });
  }
}
