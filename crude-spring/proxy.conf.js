const PROXY_CONF = [
  {
    context: ['/api'],
    target: 'http://localhost:4300/',
    secure: false,
    logLevel: 'debug'
  }
];

module.exports = PROXY_CONF;
