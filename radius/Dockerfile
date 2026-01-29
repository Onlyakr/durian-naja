FROM freeradius/freeradius-server:latest

# Install PostgreSQL driver for FreeRADIUS SQL module
USER root
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        freeradius-postgresql \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

# Enable SQL module by creating symlink
RUN ln -sf /etc/raddb/mods-available/sql /etc/raddb/mods-enabled/sql

# Fix permissions for mounted config files
RUN chown -R freerad:freerad /etc/raddb/mods-enabled /etc/raddb/sites-enabled

USER freerad
