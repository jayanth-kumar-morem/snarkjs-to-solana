# Proof Utils - WASM Package

This is a Rust-based WASM package that provides proof conversion utilities for Solana compatibility.

## Building

### Prerequisites

- Rust toolchain
- `wasm-pack` CLI tool

### Build Commands

#### Build both targets (recommended):
```bash
./build.sh
```

This creates a unified package at `pkg/` with both web and bundler targets.

#### Build individual targets:

**Web target** (for direct browser usage):
```bash
wasm-pack build --target web --out-dir pkg-web
```

**Bundler target** (for Node.js and bundlers):
```bash
wasm-pack build --target bundler --out-dir pkg-bundler
```

## Package Structure

After building, the unified package structure will be:

```
pkg/
├── web/                    # Web-targeted WASM files
│   ├── proof_utils.js
│   ├── proof_utils_bg.wasm
│   └── proof_utils.d.ts
├── bundler/                # Bundler-targeted WASM files
│   ├── proof_utils.js
│   ├── proof_utils_bg.js
│   ├── proof_utils_bg.wasm
│   └── proof_utils.d.ts
├── index.js               # Main entry (bundler)
├── index-web.js          # Web entry
├── index.d.ts            # TypeScript declarations
├── index-web.d.ts        # Web TypeScript declarations
└── package.json          # Package metadata
```

## Functions

### `convert_proof(proof: Uint8Array) -> Uint8Array`

Converts a proof from snarkjs format to Solana-compatible format.

**Parameters:**
- `proof`: Input proof as Uint8Array

**Returns:**
- Converted proof as Uint8Array

## Development

### Adding New Functions

1. Add the function to `src/lib.rs`
2. Mark it with `#[wasm_bindgen(js_name = "function_name")]`
3. Rebuild the package
4. Update TypeScript declarations if needed

### Testing

```bash
cargo test
```

### Linting

```bash
cargo clippy
``` 