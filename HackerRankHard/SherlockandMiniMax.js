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
 * Complete the 'sherlockAndMinimax' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY arr
 *  2. INTEGER p
 *  3. INTEGER q
 */

function sherlockAndMinimax(arr, p, q) {
    arr.sort((a, b) => a - b);

    // helper: distance from x to closest element in arr
    function minDist(x) {
        let l = 0, r = arr.length - 1;
        while (l <= r) {
            const mid = (l + r) >> 1;
            if (arr[mid] === x) return 0;
            if (arr[mid] < x) l = mid + 1;
            else r = mid - 1;
        }
        let d = Infinity;
        if (l < arr.length) d = Math.min(d, Math.abs(arr[l] - x));
        if (l - 1 >= 0) d = Math.min(d, Math.abs(arr[l - 1] - x));
        return d;
    }

    let bestM = p;
    let bestVal = -1;

    // gather candidate Ms
    const candidates = [p, q];

    for (let i = 1; i < arr.length; i++) {
        const a = arr[i - 1];
        const b = arr[i];
        const mid = Math.floor((a + b) / 2);
        if (mid >= p && mid <= q) candidates.push(mid);
        if (mid - 1 >= p && mid - 1 <= q) candidates.push(mid - 1);
        if (mid + 1 >= p && mid + 1 <= q) candidates.push(mid + 1);
    }

    // evaluate all candidates
    for (const m of candidates) {
        if (m < p || m > q) continue;
        const d = minDist(m);
        if (d > bestVal || (d === bestVal && m < bestM)) {
            bestVal = d;
            bestM = m;
        }
    }

    return bestM;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const p = parseInt(firstMultipleInput[0], 10);

    const q = parseInt(firstMultipleInput[1], 10);

    const result = sherlockAndMinimax(arr, p, q);

    ws.write(result + '\n');

    ws.end();
}
