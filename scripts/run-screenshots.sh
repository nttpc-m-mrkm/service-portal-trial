#!/bin/bash
# 画面スクリーンショット撮影（Docker経由）
#
# 使い方:
#   cd service-portal
#   bash scripts/run-screenshots.sh

set -e

cd "$(dirname "$0")/.."

CERT_FILE="certs/ZscalerRootCA.pem"

echo "Docker イメージをビルド中..."
if [ -f "$CERT_FILE" ]; then
  echo "Zscaler証明書を検出: $CERT_FILE"
  docker build --build-arg ZSCALER_CERT_PATH="$CERT_FILE" -f scripts/Dockerfile -t screenshot-runner .
else
  docker build -f scripts/Dockerfile -t screenshot-runner .
fi

echo "スクリーンショットを撮影中..."
docker run --rm -v "$(pwd):/site" screenshot-runner

echo "完了: docs/screenshots/ を確認してください"
