FROM mcr.microsoft.com/playwright:v1.52.0-noble

# ========================================
# Zscaler証明書の設定
# ========================================
ARG ZSCALER_CERT_PATH
WORKDIR /app

# ビルドコンテキストはプロジェクトルート（docker build -f scripts/Dockerfile .）
COPY ${ZSCALER_CERT_PATH:-NOFILE*} /usr/local/share/ca-certificates/zscaler.crt
RUN if [ -n "$ZSCALER_CERT_PATH" ]; then update-ca-certificates; fi

ENV NODE_EXTRA_CA_CERTS=${ZSCALER_CERT_PATH:+/etc/ssl/certs/ca-certificates.crt} \
    SSL_CERT_FILE=${ZSCALER_CERT_PATH:+/etc/ssl/certs/ca-certificates.crt}

# ========================================
# Playwrightのインストール
# ========================================
COPY scripts/take-screenshots.js .
RUN npm install playwright@1.52.0

# プロジェクトディレクトリを /site にマウントして実行
# docker run --rm -v "$(pwd):/site" screenshot-runner
ENTRYPOINT ["node", "take-screenshots.js"]
