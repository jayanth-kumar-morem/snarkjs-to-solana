// @ts-ignore
import * as ff from "ffjavascript";
import {convert_proof} from "proofUtils";

const g1Uncompressed = (curve: any, p1Raw: any) => {
    const p1 = curve.G1.fromObject(p1Raw);
    let buff = new Uint8Array(64);
    curve.G1.toRprUncompressed(buff, 0, p1);

    return Buffer.from(buff);
}

const g2Uncompressed = (curve: any, p2Raw: any) => {
    const p2 = curve.G2.fromObject(p2Raw);
    let buff = new Uint8Array(128);
    curve.G2.toRprUncompressed(buff, 0, p2);

    return Buffer.from(buff);
}

const toHex64Padded = (val: any) => BigInt(val).toString(16).padStart(64, "0");
const to32ByteBuffer = (val: any) => Buffer.from(toHex64Padded(val), "hex");

export async function getSolanaCompatibleProof(proof: any, publicSignals: any) {
    const curve = await ff.buildBn128();
    console.log('proof', proof);
    const proofProc = await ff.utils.unstringifyBigInts(proof);
    console.log('proofProc', proofProc);
    let proofA = g1Uncompressed(curve, proofProc.pi_a);
    // @ts-ignore
    proofA = convert_proof(proofA);
    
    const proofB = g2Uncompressed(curve, proofProc.pi_b);
    const proofC = g1Uncompressed(curve, proofProc.pi_c);

    return {
        proofA,
        proofB,
        proofC,
        publicSignals: publicSignals.map((x: any) => to32ByteBuffer(BigInt(x))),
    }
}