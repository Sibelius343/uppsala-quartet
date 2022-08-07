const dev = process.env.NODE_ENV !== 'production';

export const BASE_API_URL = dev ? 
  'http://localhost:3000' :
  'https://uppsala.com'