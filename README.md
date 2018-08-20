## Github-Webhook

A Simple Node.js server for handling Github webhooks

### Core Components

- Express.js
- Bunyan


### Setup PM2

PM2 is a node process manager tool which can be used to keep nodejs alive in background. 

```
npm install -g pm2
pm2 startup ubuntu
```
### Setup Nginx as a reverse proxy

```
location /api{
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

