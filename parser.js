let csv = require('csv-parser');
const fs = require('fs');
const filepath = '../trial_balance.txt'
let taxes ={
    occupancy:0,
    FB:0,
    Misc:0,
    BanquetRoom:0,
    Banquet:0
};
let payments = {
    cash:0,
    vsmc:0,
    vsmcpos:0,
    amex:0,
    amexpos:0,
    disc:0,
    discpos:0,
    diners:0
};


fs.createReadStream(filepath)
.on('error', () =>{
    //handle error
})

.pipe(csv({'separator':':'}))
.on('data', (row) =>{
    //calculate room tax
    if(row.TRX_CODE == 7100 || row.TRX_CODE == 7101 || row.TRX_CODE == 7200|| row.TRX_CODE == 7201  ){
        taxes.occupancy += Number(row.TB_AMOUNT);
    }
    //calculate F&B Taxes
    if(row.TRX_CODE == 2600){
        taxes.FB += Number(row.TB_AMOUNT);
    }
    //calculate cash deposit for the day (9000 + 9001 + 9300 + 2502) * -1
    if(row.TRX_CODE == 9000 || row.TRX_CODE == 9001 || row.TRX_CODE == 9300 || row.TRX_CODE == 2502){
        payments.cash += (row.TB_AMOUNT * -1);
    }
    // calculate vs/mc
    if(row.TRX_CODE == 9004 || row.TRX_CODE == 9005){
        payments.vsmc += (row.TB_AMOUNT * -1);
    }
    //calculate vs/mc-pos
    if(row.TRX_CODE == 9304 || row.TRX_CODE == 9305){
        payments.vsmcpos += (row.TB_AMOUNT * -1);
    }
    //calculate amex
    if(row.TRX_CODE == 9003 ){
        payments.amex += (row.TB_AMOUNT * -1);
    }
    //calculate amex-pos
    if(row.TRX_CODE == 9303 ){
        payments.amexpos += (row.TB_AMOUNT * -1);
    }
    //calculate discover
    if(row.TRX_CODE == 9007 ){
        payments.disc += (row.TB_AMOUNT * -1);
    }    //calculate discover pos
    if(row.TRX_CODE == 9307 ){
        payments.discpos += (row.TB_AMOUNT * -1);
    }
    //calculate diners club
    if(row.TRX_CODE == 9015 ){
        payments.diners += (row.TB_AMOUNT * -1);
    }

    // if(row.TRX_TYPE === 'PAYMENT'){
    //     console.log('code: ', row.TRX_CODE)
    //     console.log('amount: ', row.TB_AMOUNT)
    // }
})
.on('end', (lastrow)=>{

    console.log('//////////////////////////////Taxes///////////////////////////')
    console.log("occupancy tax - 10.5%: ","\t", taxes.occupancy)
    console.log("F&B Sales Tax - 7.5%: ","\t\t", taxes.FB)
    console.log("Misc. Tax - 7.5.5%: ","\t\t", taxes.Misc)
    console.log("Banquet Room tax - 3%: ","\t", taxes.BanquetRoom)
    console.log("Banquet tax - 7.5%: ","\t\t", taxes.Banquet)



    console.log('//////////////////////////////////////////////////////////////')

    console.log('//////////////////////////////Payments///////////////////////////')
    console.log("Cash: ","\t\t\t", payments.cash.toFixed(2),"\n");

    console.log("Visa/MC -Hotel: ","\t", payments.vsmc.toFixed(2));
    console.log("Visa/MC -Rest: ","\t", payments.vsmcpos.toFixed(2),"\n");

    console.log("Amex -Hotel: ","\t\t", payments.amex.toFixed(2));
    console.log("Amex -Rest: ","\t\t", payments.amexpos.toFixed(2),"\n");

    console.log("Discover -Hotel: ","\t", payments.disc.toFixed(2));
    console.log("Discover -Rest: ","\t", payments.discpos.toFixed(2),"\n");

    console.log("Diners Club -Rest: ","\t", payments.diners.toFixed(2),"\n");

    console.log("actdeposit: ","\t\t", payments.cash.toFixed(2));
    console.log('/////////////////////////////////////////////////////////////////')
})