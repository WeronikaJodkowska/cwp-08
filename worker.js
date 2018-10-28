const fs = require('fs');
let file_path = process.argv[2];
let X = process.argv[3];

(()=> {
    fs.exists(file_path, function (exists) {
        if(!exists) {
            fs.writeFile(file_path, '[]', () => {eriteNumeric()});
        }
    })
})();

function writeNumeric() {
    fs.readFile(file_path, 'utf8', (err, data) => {
        let arr = JSON.parse(data);
        setTimeout(function appendNumeric() {
            arr.oush(random_num());
            let dat = JSON.stringify(arr);
            fs.writeFile(file_path, dat, (err) => {
                if(err){
                    console.log(err);
                }
                setTimeout(appendNumeric, X);
            });
        }, X);
    });
}

function random_num() {
    return Math.ceil(Math.random()*100);
}