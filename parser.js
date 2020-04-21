const robot = require('robotjs');
const enter = require('./input.js');
const marketCodeParse = require('./marketCode.js');
const managerReportParse = require('./managerReport.js');
const exportReports = require('./exportReports');
var inputArr = [];
robot.setKeyboardDelay(0);
let csv = require('csv-parser');
const fs = require('fs');
const filepath = require('./findFiles');
let fbTotal =0;
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
let misc = {
    valetLaundry:0,
    guestLaundry:0,
    copy:0,
    giftShop:0,
    misc:0,
    postage:0,
    themePark:0,  
};

let fb ={restBreak:0,restLunch:0,restDinner:0,loungeFood:0,rsBreak:0,
    rsLunch:0,rsDinner:0,banqBreak:0,banqLunch:0,banqDinner:0,banqCoffee:0,
    banqRec:0,banqRoom:0,banqEquip:0,banqService:0,lLiq:0,lBeer:0,lWine:0, rLiq:0,rBeer:0,
    rWine:0,bLiq:0,bBeer:0,bWine:0,rsLiq:0,rsBeer:0,rsWine:0,rsDelivery:0, 
    fbTax:0,winnersCircle:0
}

let arr = marketCodeParse(filepath.marketCodeStats);
let roomRevenue = arr[0];
let roomStats = arr[1];
let managerReport = managerReportParse(filepath.managerReport);

function parser(){
    for(let i =0; i < 144; i++){
        inputArr.push(0);
    }

    // read the trial balance file
     let readstream = fs.createReadStream(filepath.trialBalance);
    readstream.on('error', () =>{
        //handle error
    })
    .pipe(csv({'separator':':'}))
    .on('data', (row) =>{
        //restaurant breakfast
        if(row.TRX_CODE == 2101 || row.TRX_CODE == 2109 ){
            fb.restBreak += Number(row.TB_AMOUNT);
        }
        //restaurant lunch
        if(row.TRX_CODE == 2102 || row.TRX_CODE == 2110 ){
            fb.restLunch += Number(row.TB_AMOUNT);
        }
        //restaurant dinner
        if(row.TRX_CODE == 2103 || row.TRX_CODE == 2111 ){
            fb.restDinner += Number(row.TB_AMOUNT);
        }
        //Lounge Food
        if(row.TRX_CODE == 2201 || row.TRX_CODE == 2202 || row.TRX_CODE == 2203 || row.TRX_CODE == 2209 || row.TRX_CODE == 2210 || row.TRX_CODE == 2211 ){
            fb.loungeFood += Number(row.TB_AMOUNT);
        }
        // Winner's Circle
        if(row.TRX_CODE == 2900){
            fb.winnersCircle += Number(row.TB_AMOUNT);
        }
        //Room Service Breakfast
        if(row.TRX_CODE == 2301 || row.TRX_CODE == 2309){
            fb.rsBreak += Number(row.TB_AMOUNT);
        }
        //Room Service Lunch
        if(row.TRX_CODE == 2302 || row.TRX_CODE == 2310){
            fb.rsLunch += Number(row.TB_AMOUNT);
        }
        //Room Service Dinner
        if(row.TRX_CODE == 2303 || row.TRX_CODE == 2311){
            fb.rsDinner += Number(row.TB_AMOUNT);
        }
        //Banquet Breakfrast
        if(row.TRX_CODE == 4001 || row.TRX_CODE == 4021 ){
            fb.banqBreak += Number(row.TB_AMOUNT);
        }
        //Banquet Lunch
        if(row.TRX_CODE == 4061 ||row.TRX_CODE == 4081  ){
            fb.banqLunch += Number(row.TB_AMOUNT);
        }
        //Banquet Dinner
        if(row.TRX_CODE == 4181 ||row.TRX_CODE == 4201  ){
            fb.banqDinner += Number(row.TB_AMOUNT);
        }
        //Banquet Coffee Break
        if(row.TRX_CODE == 4186 ||row.TRX_CODE == 4187 || row.TRX_CODE == 4206 ||row.TRX_CODE == 4207 ){
            fb.banqCoffee += Number(row.TB_AMOUNT);
        }
        //Banquet Reception
        if(row.TRX_CODE == 4121||row.TRX_CODE == 4141 ){
            fb.banqCoffee += Number(row.TB_AMOUNT);
        }
        //Banquet Room Rental
        if(row.TRX_CODE == 4000 || row.TRX_CODE == 4020 ){
            fb.banqCoffee += Number(row.TB_AMOUNT);
        }
        //Banquet Equipment
        if(row.TRX_CODE == 4242){
            fb.banqEquip += Number(row.TB_AMOUNT);
        }
        // Lounge Liquor
        if(row.TRX_CODE == 2204 ){
            fb.lLiq += Number(row.TB_AMOUNT);
        }
        // Lounge Beer
        if(row.TRX_CODE == 2205 ){
            fb.lBeer += Number(row.TB_AMOUNT);
        }
        // Lounge Wine
        if(row.TRX_CODE == 2206 ){
            fb.lWine += Number(row.TB_AMOUNT);
        }
        // Rest Liquor
        if(row.TRX_CODE == 2104 ){
            fb.rLiq += Number(row.TB_AMOUNT);
        }
        // Rest Beer
        if(row.TRX_CODE == 2105 ){
            fb.rBeer += Number(row.TB_AMOUNT);
        }
        // Rest Wine
        if(row.TRX_CODE == 2106 ){
            fb.rWine += Number(row.TB_AMOUNT);
        }
        // Banquet Liquor
        if(row.TRX_CODE == 4002 || row.TRX_CODE == 4022 ){
            fb.bLiq += Number(row.TB_AMOUNT);
        }
        // Banquet Beer
        if(row.TRX_CODE == 4004 || row.TRX_CODE == 4024 ){
            fb.bBeer += Number(row.TB_AMOUNT);
        }
        // Banquet Wine
        if(row.TRX_CODE == 4005 || row.TRX_CODE == 4025 ){
            fb.bWine += Number(row.TB_AMOUNT);
        }
        // Room Service Liquor
        if(row.TRX_CODE == 2304 ){
            fb.rsLiq += Number(row.TB_AMOUNT);
        }
        // Room Service Beer
        if(row.TRX_CODE == 2305 ){
            fb.rsBeer += Number(row.TB_AMOUNT);
        }
        // Room Service Wine
        if(row.TRX_CODE == 2306 ){
            fb.rsWine += Number(row.TB_AMOUNT);
        }
        // Banquet Non-Alcoholic
        if(row.TRX_CODE == 4003 || row.TRX_CODE == 4023 ){
            if(fb.banqBreak > 1)fb.banqBreak += Number(row.TB_AMOUNT);
            else if(fb.banqLunch > 1)fb.banqLunch += Number(row.TB_AMOUNT);
            else if(fb.banqDinner > 1)fb.banqDinner += Number(row.TB_AMOUNT);
            else if(fb.banqCoffee > 1)fb.banqCoffee += Number(row.TB_AMOUNT);
            else fb.banqRec += Number(row.TB_AMOUNT);
        }
        
        //calculate RS Delivery
        if(row.TRX_CODE == 2501){
            fb.rsDelivery += Number(row.TB_AMOUNT - (row.TB_AMOUNT/ 1.075)).toFixed(2) 
            taxes.FB += Number(row.TB_AMOUNT - fb.rsDelivery);
        }
        //valetLaundry
        if(row.TRX_CODE == 5000){
            misc.valetLaundry +=  Number(row.TB_AMOUNT)
        }
        //copy
        if(row.TRX_CODE == 4701|| row.TRX_CODE == 4751 || row.TRX_CODE == 4507 ||row.TRX_CODE == 4557){
            misc.copy +=  Number(row.TB_AMOUNT)
        }
        // giftshop
        if(row.TRX_CODE == 5106 || row.TRX_CODE ==5156){
            misc.giftShop +=  Number(row.TB_AMOUNT)
        }
        
        //add up total food and beverage for tax adjustment
        if(row.TRX_CODE >= 2000 && row.TRX_CODE <=2963){
            if(row.TRX_CODE != 2501 && row.TRX_CODE != 2502){
                fbTotal += Number(row.TB_AMOUNT)
            }
        }
        //calculate room tax
        if(row.TRX_CODE == 7100 || row.TRX_CODE == 7101 || row.TRX_CODE == 7200|| row.TRX_CODE == 7201  ){
            taxes.occupancy += Number(row.TB_AMOUNT);
        }
        //calculate F&B Taxes
        if(row.TRX_CODE == 2600){
            taxes.FB += Number(row.TB_AMOUNT);
        }
        //calculate Misc Taxes
        if(row.TRX_CODE == 7211 || row.TRX_CODE == 7212){
            taxes.Misc += Number(row.TB_AMOUNT);
        }
        //calculate Banquet Room Tax
        if(row.TRX_CODE == 4240){
            taxes.Misc += Number(row.TB_AMOUNT);
        }
        //calculate Banquet Tax
        if(row.TRX_CODE == 4244){
            taxes.Misc += Number(row.TB_AMOUNT);
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
        
        let fbtaxshb = Number(fbTotal - (fbTotal/ 1.075)).toFixed(2)
        if(taxes.FB !== fbtaxshb){
            let adj = Number((taxes.FB - fbtaxshb).toFixed(2));
            taxes.FB = fbtaxshb;
            if(fb.restBreak - adj > 0){
                fb.restBreak = fb.restBreak + adj;
            }else if(fb.restLunch - adj > 0){
                fb.restLunch = fb.restLunch + adj;
            }else if(fb.restDinner - adj > 0){
                fb.restDinner = fb.restDinner + adj;
            }else{
                fb.loungeFood = fb.loungeFood + adj;
            }  
        }
        if(fb.loungeFood > fb.winnersCircle) fb.loungeFood += fb.winnersCircle
        else if(fb.restBreak > fb.winnersCircle)fb.restBreak += fb.winnersCircle;
        else if(fb.restLunch > fb.winnersCircle)fb.restLunch += fb.winnersCircle;
        else fb.restDinner += fb.winnersCircle;0


        inputArr.push('checking')
        inputArr[15] = fb.restBreak;
        inputArr[17] = fb.restLunch;
        inputArr[18] =fb.restDinner;
        inputArr[20] =fb.loungeFood;
        inputArr[22] = fb.rsBreak;
        inputArr[23] = fb.rsLunch;
        inputArr[24] =fb.rsDinner;
        inputArr[26] =fb.banqBreak;
        inputArr[27] =fb.banqLunch;
        inputArr[28] =fb.banqDinner;
        inputArr[29] =fb.banqCoffee;
        inputArr[30] =fb.banqRec;
        inputArr[32] =fb.banqRoom;
        inputArr[33] =fb.banqEquip;
        inputArr[34]=fb.lLiq;
        inputArr[35] =fb.lBeer;
        inputArr[36] =fb.lWine;
        inputArr[37] =fb.rLiq;
        inputArr[38] =fb.rBeer;
        inputArr[39] =fb.rWine;
        inputArr[40] =fb.bLiq;
        inputArr[41] =fb.bBeer;
        inputArr[42] =fb.bWine;
        inputArr[43] =fb.rsLiq;
        inputArr[44] =fb.rsBeer;
        inputArr[45] =fb.rsWine;

        inputArr[52] = misc.valetLaundry;
        inputArr[53] = misc.guestLaundry;
        inputArr[54] = misc.copy;
        inputArr[55] = misc.giftShop;
        inputArr[60] = misc.misc;
        inputArr[61] = misc.postage;
        inputArr[72] =misc.themePark;
        // banq service
        inputArr[73] =  fb.banqService;
        //room service delivery
        inputArr[74] = fb.rsDelivery;

        inputArr[78] =taxes.occupancy.toFixed(2)
        inputArr[80] =taxes.FB
        inputArr[82] =taxes.Misc.toFixed(2)
        inputArr[86] =taxes.BanquetRoom
        inputArr[87] =taxes.Banquet



        
        inputArr[93] = payments.cash.toFixed(2)
        inputArr[109] = payments.cash.toFixed(2)
        inputArr[94] =payments.vsmc.toFixed(2)
        inputArr[95] = payments.vsmcpos.toFixed(2)
        inputArr[97] =payments.amex.toFixed(2)
        inputArr[98]=payments.amexpos.toFixed(2)
        inputArr[100]=payments.disc.toFixed(2)
        inputArr[101]=payments.discpos.toFixed(2)
        inputArr[103]=payments.diners.toFixed(2)
              // Guest Ledger121 City Ledger 122 Advance deposit 123 
              
            })
    .on('end', (lastrow)=>{
              
            })
}

function buyTime(){
    console.log('completed')
}
console.log(inputArr)
parser();
setTimeout(buyTime, 2000)

module.exports = inputArr;