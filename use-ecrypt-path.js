// find which encrypted files path length exceeds limit for S3 backup

const path = require('path');
const fs = require('fs');
const ecryptPathEstimate = require('./ecrypt-path.js').ecryptPathEstimate;

let found = 0;
let scanned = 0;

// iterate through files based on
// https://stackoverflow.com/questions/25460574/find-files-by-extension-html-under-a-folder-in-nodejs
function fromDir(dirPath,dirPathLength) {
    if (!fs.existsSync(dirPath)){
        console.log("no dir ",dirPath);
        return;
    }
    var files=fs.readdirSync(dirPath);
    for(var i=0;i<files.length;i++) {
        var filename = path.join(dirPath, files[i]);
        const nameEstimate = ecryptPathEstimate(files[i].length);
        if (dirPathLength + 1 + nameEstimate > 1023) {
            found++;
            console.log(dirPathLength + 1 + nameEstimate, filename);
        }
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()){
            fromDir(filename,dirPathLength+1+nameEstimate); //recurse
        }
        else {
            scanned++;
            if( scanned % 1000 == 0 ) console.log( scanned );
        }
    }
}

fromDir( "/Volumes/homeEkkard", ecryptPathEstimate(10) );
console.log("found", found, "files from ", scanned, "total, done.");

