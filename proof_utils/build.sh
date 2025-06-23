#!/bin/bash

# Clean previous builds
rm -rf pkg-web pkg-bundler pkg-nodejs

# Build for web target
echo "Building for web target..."
wasm-pack build --target web --out-dir pkg-web

# Build for bundler target  
echo "Building for bundler target..."
wasm-pack build --target bundler --out-dir pkg-bundler

# Build for nodejs target (CommonJS compatible)
echo "Building for nodejs target..."
wasm-pack build --target nodejs --out-dir pkg-nodejs

# Create unified pkg structure
echo "Creating unified package structure..."
mkdir -p pkg/web pkg/bundler pkg/nodejs

# Copy web target files
cp -r pkg-web/* pkg/web/

# Copy bundler target files
cp -r pkg-bundler/* pkg/bundler/

# Copy nodejs target files
cp -r pkg-nodejs/* pkg/nodejs/

echo "Build completed! Generated unified package at pkg/ with:"
echo "- pkg/web/ (for web environments)"
echo "- pkg/bundler/ (for bundler environments)"
echo "- pkg/nodejs/ (for Node.js CommonJS environments)"
echo "- pkg/index.js (main entry point)"
echo "- pkg/index-web.js (web entry point)" 