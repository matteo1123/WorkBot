let exportReports = require('./exportReports.js');
let parser = require('./parser.js')
let enter = require('./input.js')

var myArgs = process.argv;

if(myArgs.includes('--help')){
console.log('Type "node automate --export" to have the three reports used in entering the flash automatically exported from Opera')
console.log('Note: Opera should be covering the left half of the screen, this can easily be achieved by dragging the opera window to the left side of the screen')
console.log('Type "node automate --parse" to have the reports parsed and the appropriate data printed to the screen')
console.log('Type "node automate --input" to have the reports parsed and entered into the flash automatically')
console.log('Note: the Flash should be covering the right half of the screen, and it should be ready to accept data- in edit mode.')

}else if(myArgs.includes('--export')){
    exportReports()
}else if(myArgs.includes('--parse')){
    let inputArr = parser();
    setTimeout(enter, 1000, inputArr);
}else if(myArgs.includes('--input')){
    let inputArr = parser();
    setTimeout(enter, 1000, inputArr);
}else{
    exportReports()
    let inputArr = parser();
    setTimeout(enter, 1000, inputArr);
}
