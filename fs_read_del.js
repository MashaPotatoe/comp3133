const csv = require('csv-parser')
const fs = require('fs')


  // delete if they exist
if (fs.existsSync('canada.txt')){
    fs.unlinkSync('canada.txt');
}
if (fs.existsSync('usa.txt')){
    fs.unlinkSync('usa.txt');
}
// stream for each

const readStreamCsv = fs.createReadStream('input_countries.csv');
//add the flags in or it doesnt work 
const canadaStream = fs.createWriteStream('canada.txt', { flags: 'w' });
const usaStream = fs.createWriteStream('usa.txt', { flags: 'w' });
// reading the csv
readStreamCsv
    .pipe(csv())
    .on('data', (row) => {
        if (row.country === 'Canada'){
            console.log('Canada log:', row);
            canadaStream.write(`${Object.values(row).join(',')}\n`);
        } else if (row.country === 'United States'){
            console.log("Usa Log:", row);
            usaStream.write(`${Object.values(row).join(',')}\n`)
        }
    })
    .on('end', () => {
        console.log('CSV read ');
        canadaStream.end();
        usaStream.end();
    });

  
/*
// wx is if the file doesnt exist and gives you error
fs.open('data.txt', 'r+', (err, fd) => {
    if(err){
        console.log(err)
        return
    }

    var buffer = Buffer.alloc(10)
    // read call back
    fs.read(fd, buffer, 0, buffer.length) 
    console.log(buffer.toString())

    fs.writeSync(fd, Buffer.from('Toronto'), 0, 7, 21)
    //fs.writeSync()

    fs.closeSync(fd)
})
    */