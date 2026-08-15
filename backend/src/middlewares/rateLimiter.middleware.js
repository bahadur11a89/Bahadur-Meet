const requestsMap = new Map();

export const createRateLimiter = (options = {}) => {
  const windowMs = options.windowMs || 15 * 60 * 1000; // 15 minutes
  const max = options.max || 100; // Max requests per window
  const message = options.message || 'Too many requests, please try again later.';

  return (req, res, next) => {
    const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const key = `${req.path}_${ip}`;
    const now = Date.now();

    if (!requestsMap.has(key)) {
      requestsMap.set(key, []);
    }

    const timestamps = requestsMap.get(key).filter((time) => now - time < windowMs);
    timestamps.push(now);
    requestsMap.set(key, timestamps);

    if (timestamps.length > max) {
      return res.status(429).json({
        success: false,
        message,
      });
    }

    next();
  };
};

export const sensitiveAuthLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: 'Too many authentication attempts, please try again after 15 minutes.',
});

export const aiGenerationLimiter = createRateLimiter({
  windowMs: 5 * 60 * 1000,
  max: 10,
  message: 'Too many AI generation requests, please try again after 5 minutes.',
});