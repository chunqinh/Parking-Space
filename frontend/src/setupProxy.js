const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        createProxyMiddleware(["/api", undefined, "/otherApi"], { target: "https://parkapp-space-442-backend.herokuapp.com/" })
    );
};