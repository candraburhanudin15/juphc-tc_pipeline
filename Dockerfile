FROM nginx:alpine

COPY default.conf /etc/nginx/conf.d/default.conf
COPY app/favicon.ico /usr/share/nginx/html/favicon.ico
COPY app/index.html /usr/share/nginx/html/index.html
COPY app/script.js /usr/share/nginx/html/script.js
COPY app/style.css /usr/share/nginx/html/style.css
COPY app/taxCalculator.js /usr/share/nginx/html/taxCalculator.js

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
