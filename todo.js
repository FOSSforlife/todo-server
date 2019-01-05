const fs = require('fs');
const path = require('path');
const walk = require('walk');
const leasot = require('leasot');



async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
}

module.exports.getTodos = async function (dirPath, customTags) {
    
    let comments = [];

    return await new Promise((resolve, reject) => {

        const walker = walk.walk(dirPath);

        walker.on('file', (root, fileStats, next) => {
            let filePath = path.join(root, fileStats.name);
            
            let filetype = path.extname(fileStats.name);
            let contents = fs.readFileSync(filePath, {encoding: 'utf8'});
            
            if(leasot.isExtSupported(filetype)) {
                comments = comments.concat(leasot.parse({ext: filetype, content: contents, fileName: fileStats.name, customTags: customTags }));
            }
            next();
        })

        walker.on('end', () => {
            comments = comments.sort((t1, t2) => t1.kind > t2.kind);
            console.log(comments);
            resolve(comments);
        })
    });
    
}

// getTodos('/home/elias/js/big-things/os/os-ng/projects/train', ['XTRA'])
// .then(console.log);