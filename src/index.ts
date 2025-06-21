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

export async function snarkjsToSolana(proof: any) {
    const curve = await ff.buildBn128();
    const proofProc = await ff.utils.unstringifyBigInts(proof);
    let proofA = g1Uncompressed(proofProc.pi_a);
    proofA = await convert_proof(proofA);
    const proofB = g2Uncompressed(proofProc.pi_b);
    const proofC = g1Uncompressed(proofProc.pi_c);

    return {
        proofA,
        proofB,
        proofC
    }
}