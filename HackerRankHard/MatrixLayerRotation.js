'use strict';

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
 * Complete the 'matrixRotation' function below.
 *
 * The function accepts following parameters:
 *  1. 2D_INTEGER_ARRAY matrix
 *  2. INTEGER r
 */

function matrixRotation(matrix, r) {
    const m = matrix.length;
    const n = matrix[0].length;
    const layers = Math.min(m, n) / 2;

    for (let layer = 0; layer < layers; layer++) {
        const elems = [];

        // top row
        for (let j = layer; j < n - layer; j++) elems.push(matrix[layer][j]);
        // right column
        for (let i = layer + 1; i < m - layer - 1; i++) elems.push(matrix[i][n - layer - 1]);
        // bottom row
        for (let j = n - layer - 1; j >= layer; j--) elems.push(matrix[m - layer - 1][j]);
        // left column
        for (let i = m - layer - 2; i > layer; i--) elems.push(matrix[i][layer]);

        const len = elems.length;
        const rot = r % len;
        if (rot !== 0) {
            const rotated = elems.slice(rot).concat(elems.slice(0, rot));
            let idx = 0;

            // top row
            for (let j = layer; j < n - layer; j++) matrix[layer][j] = rotated[idx++];
            // right column
            for (let i = layer + 1; i < m - layer - 1; i++) matrix[i][n - layer - 1] = rotated[idx++];
            // bottom row
            for (let j = n - layer - 1; j >= layer; j--) matrix[m - layer - 1][j] = rotated[idx++];
            // left column
            for (let i = m - layer - 2; i > layer; i--) matrix[i][layer] = rotated[idx++];
        }
    }

    // print result as required by Hackerrank
    for (let i = 0; i < m; i++) {
        console.log(matrix[i].join(' '));
    }
}


function main() {
    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const m = parseInt(firstMultipleInput[0], 10);

    const n = parseInt(firstMultipleInput[1], 10);

    const r = parseInt(firstMultipleInput[2], 10);

    let matrix = Array(m);

    for (let i = 0; i < m; i++) {
        matrix[i] = readLine().replace(/\s+$/g, '').split(' ').map(matrixTemp => parseInt(matrixTemp, 10));
    }

    matrixRotation(matrix, r);
}
