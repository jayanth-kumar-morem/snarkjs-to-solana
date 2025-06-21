#!/bin/bash

# Clean previous builds
rm -rf pkg-web pkg-bundler

# Build for web target
echo "Building for web target..."
wasm-pack build --target web --out-dir pkg-web

# Build for bundler target  
echo "Building for bundler target..."
wasm-pack build --target bundler --out-dir pkg-bundler

# Create unified pkg structure
echo "Creating unified package structure..."
mkdir -p pkg/web pkg/bundler

# Copy web target files
cp -r pkg-web/* pkg/web/

# Copy bundler target files
cp -r pkg-bundler/* pkg/bundler/

echo "Build completed! Generated unified package at pkg/ with:"
echo "- pkg/web/ (for web environments)"
echo "- pkg/bundler/ (for bundler environments)"
echo "- pkg/index.js (main entry point)"
echo "- pkg/index-web.js (web entry point)" 