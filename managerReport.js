const csv = require('csv-parser');
const fs = require('fs');

async function managerReportParse(filepath) {
  const retObj = {
    comp: 0,
    vacant: 0,
    OOO: 0,
    walkin: 0,
    persons: 0,
    arrivals: 0,
  };

  // read the Market Code Statistics file
  await fs
    .createReadStream(filepath)
    .on('error', () => {
      // handle error
    })
    .pipe(csv({ separator: '\t' }))
    .on('data', row => {
      if (row.DESCRIPTION) {
        // console.log(row.DESCRIPTION)

        if (row.DESCRIPTION.slice(0, 5) === 'Compl') {
          if (row.HEADING_1_ORDER == 1) {
            retObj.comp = row.FORMATTED_AMOUNT;
          }
        }
        if (row.DESCRIPTION.slice(0, 10) === 'Available R') {
          if (row.HEADING_1_ORDER == 1) {
            retObj.vacant = row.FORMATTED_AMOUNT;
          }
        }
      }
    });
  return retObj;
}
module.exports = managerReportParse;
