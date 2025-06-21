import * as wasm from "./proof_utils_bg.wasm";
export * from "./proof_utils_bg.js";
import { __wbg_set_wasm } from "./proof_utils_bg.js";
__wbg_set_wasm(wasm);
wasm.__wbindgen_start();
