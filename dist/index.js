"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSolanaCompatibleProof = getSolanaCompatibleProof;
// @ts-ignore
const ff = __importStar(require("ffjavascript"));
const proofUtils_1 = require("proofUtils");
const g1Uncompressed = (curve, p1Raw) => {
    const p1 = curve.G1.fromObject(p1Raw);
    let buff = new Uint8Array(64);
    curve.G1.toRprUncompressed(buff, 0, p1);
    return Buffer.from(buff);
};
const g2Uncompressed = (curve, p2Raw) => {
    const p2 = curve.G2.fromObject(p2Raw);
    let buff = new Uint8Array(128);
    curve.G2.toRprUncompressed(buff, 0, p2);
    return Buffer.from(buff);
};
const toHex64Padded = (val) => BigInt(val).toString(16).padStart(64, "0");
const to32ByteBuffer = (val) => Buffer.from(toHex64Padded(val), "hex");
async function getSolanaCompatibleProof(proof, publicSignals) {
    const curve = await ff.buildBn128();
    console.log('proof', proof);
    const proofProc = await ff.utils.unstringifyBigInts(proof);
    console.log('proofProc', proofProc);
    let proofA = g1Uncompressed(curve, proofProc.pi_a);
    // @ts-ignore
    proofA = (0, proofUtils_1.convert_proof)(proofA);
    const proofB = g2Uncompressed(curve, proofProc.pi_b);
    const proofC = g1Uncompressed(curve, proofProc.pi_c);
    return {
        proofA,
        proofB,
        proofC,
        publicSignals: publicSignals.map((x) => to32ByteBuffer(BigInt(x))),
    };
}
//# sourceMappingURL=index.js.map