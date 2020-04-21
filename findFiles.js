const fs = require('fs');

const filePath = '../';
const fileLocations = {};
try {
  fs.readdirSync(filePath).forEach(file => {
    if (file.slice(0, 5) === 'manag') {
      fileLocations.managerReport = filePath + file;
    }
    if (file.slice(0, 4) === 'stat') {
      fileLocations.marketCodeStats = filePath + file;
    }
    if (file.slice(0, 5) === 'trial') {
      fileLocations.trialBalance = filePath + file;
    }
  });
} catch (error) {
  console.log('error finding file path:', error);
}

module.exports = fileLocations;
