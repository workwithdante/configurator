#!bin/bash

set -e

if [[ -f "/workspaces/frappe_codespace/frappe-bench/apps/frappe" ]]
then
    echo "Bench already exists, skipping init"
    exit 0
fi

rm -rf /workspaces/frappe_codespace/.git

source /home/frappe/.nvm/nvm.sh
nvm alias default 18
nvm use 18

echo "nvm use 18" >> ~/.bashrc
cd /workspace/development

bench init --skip-redis-config-generation frappe-bench --version version-15

cd frappe-bench

# Use containers instead of localhost
bench set-mariadb-host mariadb
bench set-redis-cache-host redis-cache:6379
bench set-redis-queue-host redis-queue:6379
bench set-redis-socketio-host redis-socketio:6379

# Remove redis from Procfile
sed -i '/redis/d' ./Procfile


bench get-app https://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@github.com/jorgeadeviam2023/rocky.git --branch develop
bench get-app erpnext --branch version-15

bench new-site localhost \
--force \
--mariadb-root-password 123 \
--admin-password admin \
--no-mariadb-socket

bench --site localhost install-app erpnext
bench --site localhost install-app rocky
bench --site localhost set-config developer_mode 1
bench --site localhost clear-cache
bench --site localhost set-config mute_emails 1
bench use localhost
