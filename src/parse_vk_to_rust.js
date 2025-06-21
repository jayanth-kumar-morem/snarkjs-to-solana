var ffjavascript = require('ffjavascript');
const {unstringifyBigInts, leInt2Buff} = ffjavascript.utils;
var fs = require("fs")
const path = require('path');

async function parseVerificationKeyToRust(inputPath, outputDir = '.') {
  return new Promise((resolve, reject) => {
    fs.readFile(inputPath, async function(err, fd) {
      if (err) {
        return reject(new Error(`Failed to read file: ${err.message}`));
      }
      
      try {
        var mydata = JSON.parse(fd.toString());

        for (var i in mydata) {
          if (i == 'vk_alpha_1') {
            for (var j in mydata[i]) {
              mydata[i][j] = leInt2Buff(unstringifyBigInts(mydata[i][j]), 32).reverse()
            }
          } else if (i == 'vk_beta_2') {
            for (var j in mydata[i]) {
              let tmp = Array.from(leInt2Buff(unstringifyBigInts(mydata[i][j][0]), 32)).concat(Array.from(leInt2Buff(unstringifyBigInts(mydata[i][j][1]), 32))).reverse()
              mydata[i][j][0] = tmp.slice(0,32)
              mydata[i][j][1] = tmp.slice(32,64)
            }
          } else if (i == 'vk_gamma_2') {
            for (var j in mydata[i]) {
              let tmp = Array.from(leInt2Buff(unstringifyBigInts(mydata[i][j][0]), 32)).concat(Array.from(leInt2Buff(unstringifyBigInts(mydata[i][j][1]), 32))).reverse()
              mydata[i][j][0] = tmp.slice(0,32)
              mydata[i][j][1] = tmp.slice(32,64)
            }
          } else if (i == 'vk_delta_2') {
            for (var j in mydata[i]) {
              let tmp = Array.from(leInt2Buff(unstringifyBigInts(mydata[i][j][0]), 32)).concat(Array.from(leInt2Buff(unstringifyBigInts(mydata[i][j][1]), 32))).reverse()
              mydata[i][j][0] = tmp.slice(0,32)
              mydata[i][j][1] = tmp.slice(32,64)
            }
          }
          else if (i == 'vk_alphabeta_12') {
            for (var j in mydata[i]) {
              for (var z in mydata[i][j]){
                for (var u in mydata[i][j][z]){
                  mydata[i][j][z][u] = leInt2Buff(unstringifyBigInts(mydata[i][j][z][u]))
                }
              }
            }
          }
          else if (i == 'IC') {
            for (var j in mydata[i]) {
              for (var z in mydata[i][j]){
                 mydata[i][j][z] = leInt2Buff(unstringifyBigInts(mydata[i][j][z]), 32).reverse()
              }
            }
          }
        }

        const outputPath = path.join(outputDir, "vote_verifying_key.rs");
        let resFile = fs.openSync(outputPath, "w")
        let s = `use groth16_solana::groth16::Groth16Verifyingkey;\n\npub const VERIFYINGKEY: Groth16Verifyingkey =  Groth16Verifyingkey {\n\tnr_pubinputs: ${mydata.IC.length},\n\n`
        
        s += "\tvk_alpha_g1: [\n"
        for (var j = 0; j < mydata.vk_alpha_1.length -1 ; j++) {
          s += "\t\t" + Array.from(mydata.vk_alpha_1[j]) + ",\n"
        }
        s += "\t],\n\n"
        fs.writeSync(resFile,s)
        
        s = "\tvk_beta_g2: [\n"
        for (var j = 0; j < mydata.vk_beta_2.length -1 ; j++) {
          for (var z = 0; z < 2; z++) {
            s += "\t\t" + Array.from(mydata.vk_beta_2[j][z]) + ",\n"
          }
        }
        s += "\t],\n\n"
        fs.writeSync(resFile,s)
        
        s = "\tvk_gamme_g2: [\n"
        for (var j = 0; j < mydata.vk_gamma_2.length -1 ; j++) {
          for (var z = 0; z < 2; z++) {
            s += "\t\t" + Array.from(mydata.vk_gamma_2[j][z]) + ",\n"
          }
        }
        s += "\t],\n\n"
        fs.writeSync(resFile,s)

        s = "\tvk_delta_g2: [\n"
        for (var j = 0; j < mydata.vk_delta_2.length -1 ; j++) {
          for (var z = 0; z < 2; z++) {
            s += "\t\t" + Array.from(mydata.vk_delta_2[j][z]) + ",\n"
          }
        }
        s += "\t],\n\n"
        fs.writeSync(resFile,s)
        
        s = "\tvk_ic: &[\n"
        for (var ic in mydata.IC) {
          s += "\t\t[\n"
          for (var j = 0; j < mydata.IC[ic].length - 1 ; j++) {
            s += "\t\t\t" + mydata.IC[ic][j] + ",\n"
          }
          s += "\t\t],\n"
        }
        s += "\t]\n};"
        
        fs.writeSync(resFile,s)
        fs.closeSync(resFile)
        
        resolve(outputPath);
      } catch (parseError) {
        reject(new Error(`Failed to parse verification key: ${parseError.message}`));
      }
    });
  });
}

async function main() {
  const process = require('process');
  let inputPath = process.argv[2];
  if (!inputPath) {
    throw new Error("inputPath not specified");
  }

  let outputPath = ""
  if (process.argv[3]) {
    outputPath += process.argv[3] +"/";
  }

  console.log = () => {}; // Disable console.log as in original

  try {
    await parseVerificationKeyToRust(inputPath, outputPath);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = parseVerificationKeyToRust;

if (require.main === module) {
  main();
}