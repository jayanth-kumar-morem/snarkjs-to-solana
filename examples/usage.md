# Usage Examples

## Node.js / Bundler Environment

```javascript
// In a Node.js environment or with bundlers like Webpack, Vite, etc.
import { getSolanaCompatibleProof } from 'snarkjs-to-solana';

// This automatically uses the bundler-targeted WASM package
const result = await getSolanaCompatibleProof(proof);
```

## Browser Environment

```javascript
// In a browser environment, the package automatically uses the web-targeted WASM
import { getSolanaCompatibleProof } from 'snarkjs-to-solana';

// This automatically uses the web-targeted WASM package
const result = await getSolanaCompatibleProof(proof);
```

## Manual Target Selection

```javascript
// If you need to explicitly control which target to use:

// For bundler environments (Node.js, Webpack, Vite, etc.)
import { getSolanaCompatibleProof } from 'snarkjs-to-solana/dist/index.js';

// For web environments (browsers)
import { getSolanaCompatibleProof } from 'snarkjs-to-solana/dist/index.browser.js';
```

## How It Works

The package automatically detects the environment and loads the appropriate WASM target:

- **Bundler Target**: Optimized for Node.js and bundler environments (Webpack, Vite, Rollup, etc.)
- **Web Target**: Optimized for direct browser usage with proper ES6 module support

The conditional exports in `package.json` ensure that:
- Modern bundlers get the bundler-optimized version
- Browsers get the web-optimized version
- The appropriate WASM files are loaded dynamically

## Build Process

The package uses a dual-target build system:

1. **WASM Compilation**: Rust code is compiled to two WASM targets using `wasm-pack`
2. **Unified Package**: Both targets are combined into a single package structure
3. **Conditional Exports**: Package.json exports map environments to appropriate entry points
4. **TypeScript Compilation**: TypeScript code is compiled to JavaScript for both targets

## Files Structure

```
proof_utils/
├── pkg/
│   ├── web/           # Web-targeted WASM files
│   ├── bundler/       # Bundler-targeted WASM files
│   ├── index.js       # Main entry point (bundler)
│   ├── index-web.js   # Web entry point
│   └── package.json   # Unified package configuration
├── src/
│   ├── index.ts       # Main TypeScript entry (bundler)
│   └── index.browser.ts # Browser TypeScript entry (web)
└── dist/
    ├── index.js       # Compiled bundler version
    └── index.browser.js # Compiled web version
``` 