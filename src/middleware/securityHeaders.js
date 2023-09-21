// middleware/securityHeaders.js
const securityHeaders = (req, res, next) => {
  // Add security headers here
  res.setHeader("Content-Security-Policy", "default-src 'self'");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains"
  );
  res.setHeader("Referrer-Policy", "same-origin");

  // Continue to the next middleware or route handler
  next();
};

export default securityHeaders;
