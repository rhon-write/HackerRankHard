'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'boardCutting' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY cost_y
 *  2. INTEGER_ARRAY cost_x
 */

function boardCutting(cost_y, cost_x) {
    const MOD = 1000000007n;

    // convert to BigInt and sort descending
    cost_y = cost_y.map(BigInt).sort((a, b) => (a > b ? -1 : a < b ? 1 : 0));
    cost_x = cost_x.map(BigInt).sort((a, b) => (a > b ? -1 : a < b ? 1 : 0));

    let i = 0; // index for cost_y (horizontal cuts)
    let j = 0; // index for cost_x (vertical cuts)

    let hSeg = 1n; // current number of horizontal segments
    let vSeg = 1n; // current number of vertical segments
    let total = 0n;

    while (i < cost_y.length && j < cost_x.length) {
        if (cost_y[i] >= cost_x[j]) {
            // take horizontal cut
            total = (total + cost_y[i] * vSeg) % MOD;
            hSeg += 1n;
            i++;
        } else {
            // take vertical cut
            total = (total + cost_x[j] * hSeg) % MOD;
            vSeg += 1n;
            j++;
        }
    }

    // remaining horizontal cuts
    while (i < cost_y.length) {
        total = (total + cost_y[i] * vSeg) % MOD;
        hSeg += 1n;
        i++;
    }

    // remaining vertical cuts
    while (j < cost_x.length) {
        total = (total + cost_x[j] * hSeg) % MOD;
        vSeg += 1n;
        j++;
    }

    return Number(total % MOD);
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

        const m = parseInt(firstMultipleInput[0], 10);

        const n = parseInt(firstMultipleInput[1], 10);

        const cost_y = readLine().replace(/\s+$/g, '').split(' ').map(cost_yTemp => parseInt(cost_yTemp, 10));

        const cost_x = readLine().replace(/\s+$/g, '').split(' ').map(cost_xTemp => parseInt(cost_xTemp, 10));

        const result = boardCutting(cost_y, cost_x);

        ws.write(result + '\n');
    }

    ws.end();
}
