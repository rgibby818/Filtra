#!/bin/bash

echo "Running setup"
echo ""

if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed. Please install first and run again."
    exit 1
fi

NODE_VERSION=$((node -v) | sed 's/^v//' | cut -d. -f1)

if [ "$NODE_VERSION" -lt 22 ]; then
  echo "Error: Node.js version 22 or greater is required. You have $NODE_VERSION."
  exit 1
fi

if [ ! -f package.json ]; then
  echo "Error: No package.json found. Are you in the right directory?"
  exit 1
fi

read -p "Do you want to enter your apyhub API key? (yes/no): " enter_key

enter_key=$(echo "$enter_key" | tr '[:upper:]' '[:lower:]')

if [[ "$enter_key" == "yes" || "$enter_key" == "y" ]]; then
  read -p "Enter your apy API key: " API_KEY

  echo "📄 Writing API_KEY to .env file..."
  echo "API_KEY=$API_KEY" >> .env
else
  echo "Skipping API key setup."
fi

echo "Installing npm packages..."
npm install

echo "Building vue app..."
npm run build

echo "Running Node server..."
npm run server


