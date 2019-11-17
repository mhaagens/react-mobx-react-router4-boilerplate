const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;

export { isProduction, isDevelopment };
