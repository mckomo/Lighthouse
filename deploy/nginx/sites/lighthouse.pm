server {
    listen       443;
    server_name  lighthouse.pm;
    root         /var/www/lighthouse-web/dist;

    ssl on;
    ssl_certificate     /etc/letsencrypt/live/lighthouse.pm/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/lighthouse.pm/privkey.pem;

    location / {
        index index.html index.htm;
    }
}