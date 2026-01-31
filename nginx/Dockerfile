FROM nginx:latest

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf
COPY conf.d/ /etc/nginx/conf.d/

# Copy SSL certificates (optional - for production)
# COPY ssl/ /etc/nginx/ssl/

# Expose ports
EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
