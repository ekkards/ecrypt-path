// estimate path length of encrypted files
// based on https://mikemabey.com/blog/2017/08/ecryptfs_filenames.html


exports.ecryptPathEstimate = function ecryptPathEstimate( plainPathLength ) {
    const fix = 64;
    plainPathLength = 16*(Math.floor(plainPathLength/16)+1);
    const part1 = 5*plainPathLength / 4;
    const part2 = 4 * Math.floor(plainPathLength / 64);
    return fix+part1+part2;
};

