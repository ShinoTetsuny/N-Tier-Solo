const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const app = express();

// Middleware de logging
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// Mapping des microservices
const serviceMap = {
  users: `http://localhost:${process.env.USER_SERVICE_PORT}`,
  publications: `http://localhost:${process.env.PUBLICATION_SERVICE_PORT}`
};

// Middleware dynamique pour router les requêtes
app.use("/api/:service", (req, res, next) => {
  const serviceName = req.params.service;
  const target = serviceMap[serviceName];
  console.log('Service requested:', serviceName);
  console.log('Target URL:', target);

  if (target) {
    createProxyMiddleware({
      target,
      changeOrigin: true,
      pathRewrite: {
        [`^/api/${serviceName}`]: '',
      },
      // Important : on garde tous les headers, y compris Authorization
      onProxyReq: (proxyReq, req, res) => {
        // Log des headers pour debug
        console.log('Headers transmis:', req.headers);
        
        // Si on a un body, on le transmet
        if (req.body) {
          const bodyData = JSON.stringify(req.body);
          proxyReq.setHeader('Content-Type', 'application/json');
          proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
          proxyReq.write(bodyData);
        }
      },
      logLevel: "debug"
    })(req, res, next);
  } else {
    res.status(502).send(`Service ${serviceName} non disponible.`);
  }
});

const PORT = process.env.GATEWAY_PORT || 3001;
app.listen(PORT, () => {
  console.log(`API Gateway démarrée sur le port ${PORT}`);
  console.log('Services disponibles:', Object.keys(serviceMap));
});