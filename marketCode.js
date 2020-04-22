const csv = require('csv-parser');
const fs = require('fs');

function marketCodeParse(filepath) {
  const roomRevenue = {
    specialDisc: 0,
    individualCorp: 0,
    preferredCorp: 0,
    individualGov: 0,
    groupCorp: 0,
    groupGov: 0,
    groupAssoc: 0,
    smerf: 0,
    package: 0,
  };
  const roomStats = {
    specialDisc: 0,
    individualCorp: 0,
    preferredCorp: 0,
    individualGov: 0,
    groupCorp: 0,
    groupGov: 0,
    groupAssoc: 0,
    smerf: 0,
    package: 0,
  };
  // read the Market Code Statistics file
  fs.createReadStream(filepath)
    .on('error', () => {
      // handle error
    })
    .pipe(csv({ separator: '\t' }))
    .on('data', row => {
      if (row.GRP_SORT_ORDER === 'A') {
        roomRevenue.groupAssoc += Number(row.PM_DAY_CREV);
        roomStats.groupAssoc += Number(row.PM_DAY_ROOM);
      }
      if (row.GRP_SORT_ORDER === 'B') {
        roomRevenue.groupCorp += Number(row.PM_DAY_CREV);
        roomStats.groupCorp += Number(row.PM_DAY_ROOM);
      }
      if (row.GRP_SORT_ORDER === 'C') {
        roomRevenue.groupCorp += Number(row.PM_DAY_CREV);
        roomStats.groupCorp += Number(row.PM_DAY_ROOM);
      }
      if (row.GRP_SORT_ORDER === 'D') {
        roomRevenue.specialDisc += Number(row.PM_DAY_CREV);
        roomStats.specialDisc += Number(row.PM_DAY_ROOM);
      }
      if (row.GRP_SORT_ORDER === 'E') {
        roomRevenue.individualCorp += Number(row.PM_DAY_CREV);
        roomStats.individualCorp += Number(row.PM_DAY_ROOM);
      }
      if (row.GRP_SORT_ORDER === 'G') {
        roomRevenue.individualCorp += Number(row.PM_DAY_CREV);
        roomStats.individualCorp += Number(row.PM_DAY_ROOM);
      }
      if (row.GRP_SORT_ORDER === 'H') {
        roomRevenue.package += Number(row.PM_DAY_CREV);
        roomStats.package += Number(row.PM_DAY_ROOM);
      }
      if (row.GRP_SORT_ORDER === 'K') {
        roomRevenue.package += Number(row.PM_DAY_CREV);
        roomStats.package += Number(row.PM_DAY_ROOM);
      }
      if (row.GRP_SORT_ORDER === 'L') {
        roomRevenue.preferredCorp += Number(row.PM_DAY_CREV);
        roomStats.preferredCorp += Number(row.PM_DAY_ROOM);
      }
      if (row.GRP_SORT_ORDER === 'M') {
        roomRevenue.individualGov += Number(row.PM_DAY_CREV);
        roomStats.individualGov += Number(row.PM_DAY_ROOM);
      }
      if (row.GRP_SORT_ORDER === 'N') {
        roomRevenue.individualCorp += Number(row.PM_DAY_CREV);
        roomStats.individualCorp += Number(row.PM_DAY_ROOM);
      }
      if (row.GRP_SORT_ORDER === 'P') {
        roomRevenue.preferredCorp += Number(row.PM_DAY_CREV);
        roomStats.preferredCorp += Number(row.PM_DAY_ROOM);
      }
      if (row.GRP_SORT_ORDER === 'Q') {
        roomRevenue.groupGov += Number(row.PM_DAY_CREV);
        roomStats.groupGov += Number(row.PM_DAY_ROOM);
      }
      if (row.GRP_SORT_ORDER === 'R') {
        roomRevenue.individualCorp += Number(row.PM_DAY_CREV);
        roomStats.individualCorp += Number(row.PM_DAY_ROOM);
      }
      if (row.GRP_SORT_ORDER === 'S') {
        roomRevenue.package += Number(row.PM_DAY_CREV);
        roomStats.package += Number(row.PM_DAY_ROOM);
      }
      if (row.GRP_SORT_ORDER === 'U') {
        roomRevenue.smerf += Number(row.PM_DAY_CREV);
        roomStats.smerf += Number(row.PM_DAY_ROOM);
      }
      if (row.GRP_SORT_ORDER === 'V') {
        roomRevenue.specialDisc += Number(row.PM_DAY_CREV);
        roomStats.specialDisc += Number(row.PM_DAY_ROOM);
      }
      if (row.GRP_SORT_ORDER === 'W') {
        roomRevenue.specialDisc += Number(row.PM_DAY_CREV);
        roomStats.specialDisc += Number(row.PM_DAY_ROOM);
      }
      if (row.GRP_SORT_ORDER === 'X') {
        roomRevenue.individualCorp += Number(row.PM_DAY_CREV);
        roomStats.individualCorp += Number(row.PM_DAY_ROOM);
      }
      if (row.GRP_SORT_ORDER === 'Z') {
        roomRevenue.smerf += Number(row.PM_DAY_CREV);
        roomStats.smerf += Number(row.PM_DAY_ROOM);
      }
    })
    .on('end', lastrow => {});

  return [roomRevenue, roomStats];
}

module.exports = marketCodeParse;
