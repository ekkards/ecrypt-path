// test ecryptpathestimate
//
// use values from https://mikemabey.com/blog/2017/08/ecryptfs_filenames.html
// Upper Min 	Upper Max 	Lower
//  1 	        15 	        84
//  16 	        31 	        104
//  32 	        47 	        124
//  48 	        63 	        148
//  64 	        79 	        168
//  80 	        95 	        188
//  96 	        111 	    212
//  112      	127 	    232
//  128 	    143 	    252
//  144 	    ??? 	    >255

const ecryptPathEstimate = require('./ecrypt-path.js').ecryptPathEstimate;

const plainMinLength = [
    1,
    16,
    32,
    48,
    64,
    80,
    96,
    112,
    128,
    144,
];

const plainMaxLength = [
    15,
    31,
    47,
    63,
    79,
    95,
    111,
    127,
    143,
];

const ecryptfsLength = [
    84,
    104,
    124,
    148,
    168,
    188,
    212,
    232,
    252,
];

function testpath1() {
    for (i = 0; i < plainMaxLength.length; i++) {
        const fix = 65;
        const part1 = plainMaxLength[i] + (plainMaxLength[i] + 1) / 4;
        const part2 = 4 * Math.floor((plainMaxLength[i] + 1) / 64);
        console.log(ecryptfsLength[i], fix + part1 + part2, plainMaxLength[i], part1, part2);
    }
}

function testpath2() {
    for (i = 0; i < plainMaxLength.length; i++) {
        console.log(ecryptfsLength[i],
            ecryptPathEstimate(plainMinLength[i]), ecryptPathEstimate(plainMaxLength[i]),
            plainMinLength[i], plainMaxLength[i]);
    }
}

testpath1();
testpath2();

