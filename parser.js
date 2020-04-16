const robot = require('robotjs');
const enter = require('./input.js');
const exportReports = require('./exportReports')
function parser (){
    robot.setKeyboardDelay(0);
    var inputArr = [];
    for(let i =0; i < 10; i++){
        inputArr.push(0);
    }
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
    //FB starts at index 14
    let fb ={restBreak:0,restLunch:0,restDinner:0,loungeFood:0,rsBreak:0,
        rsLunch:0,rsDinner:0,banqBreak:0,banqLunch:0,banqDinner:0,banqCoffee:0,
        banqRec:0,banqRoom:0,banqEquip:0,lLiq:0,lBeer:0,lWine:0, rLiq:0,rBeer:0,
        rWine:0,bLiq:0,bBeer:0,bWine:0,rsLiq:0,rsBeer:0,rsWine:0,rsDelivery:0, 
        fbTax:0,winnersCircle:0
    }
    
    let roomRevenue = {'specialDisc':0,'individualCorp':0,'preferredCorp':0,
    'individualGov':0,'groupCorp':0,'groupGov':0,'groupAssoc':0,'smerf':0,
    'package':0};
    let roomStats = {'specialDisc':0,'individualCorp':0,'preferredCorp':0,
    'individualGov':0,'groupCorp':0,'groupGov':0,'groupAssoc':0,'smerf':0,
    'package':0};

// read the Market Code Statistics file
 fs.createReadStream(filepath.marketCodeStats)
 .on('error', () =>{
     //handle error
 })
 .pipe(csv({'separator':'\t'}))
 .on('data', (row) =>{
if (row.GRP_SORT_ORDER ==='A'){
    roomRevenue.groupAssoc += Number(row.PM_DAY_CREV);
    roomStats.groupAssoc += Number(row.PM_DAY_ROOM)
}if (row.GRP_SORT_ORDER ==='B'){
    roomRevenue.groupCorp += Number(row.PM_DAY_CREV);
    roomStats.groupCorp += Number(row.PM_DAY_ROOM)
}if (row.GRP_SORT_ORDER ==='C'){
    roomRevenue.groupCorp += Number(row.PM_DAY_CREV);
    roomStats.groupCorp += Number(row.PM_DAY_ROOM)
}if (row.GRP_SORT_ORDER ==='D'){
    roomRevenue.specialDisc += Number(row.PM_DAY_CREV);
    roomStats.specialDisc += Number(row.PM_DAY_ROOM)
}if (row.GRP_SORT_ORDER ==='E'){
    roomRevenue.individualCorp += Number(row.PM_DAY_CREV);
    roomStats.individualCorp += Number(row.PM_DAY_ROOM)
}if (row.GRP_SORT_ORDER ==='G'){
    roomRevenue.individualCorp += Number(row.PM_DAY_CREV);
    roomStats.individualCorp += Number(row.PM_DAY_ROOM)
}if (row.GRP_SORT_ORDER ==='H'){
    roomRevenue.package += Number(row.PM_DAY_CREV);
    roomStats.package += Number(row.PM_DAY_ROOM)
}if (row.GRP_SORT_ORDER ==='K'){
    roomRevenue.package += Number(row.PM_DAY_CREV);
    roomStats.package += Number(row.PM_DAY_ROOM)
}if (row.GRP_SORT_ORDER ==='L'){
    roomRevenue.preferredCorp += Number(row.PM_DAY_CREV);
    roomStats.preferredCorp += Number(row.PM_DAY_ROOM)
}if (row.GRP_SORT_ORDER ==='M'){
    roomRevenue.individualGov += Number(row.PM_DAY_CREV);
    roomStats.individualGov += Number(row.PM_DAY_ROOM)
}if (row.GRP_SORT_ORDER ==='N'){
    roomRevenue.individualCorp += Number(row.PM_DAY_CREV);
    roomStats.individualCorp += Number(row.PM_DAY_ROOM)
}if (row.GRP_SORT_ORDER ==='P'){
    roomRevenue.preferredCorp += Number(row.PM_DAY_CREV);
    roomStats.preferredCorp += Number(row.PM_DAY_ROOM)
}if (row.GRP_SORT_ORDER ==='Q'){
    roomRevenue.groupGov += Number(row.PM_DAY_CREV);
    roomStats.groupGov += Number(row.PM_DAY_ROOM)
}if (row.GRP_SORT_ORDER ==='R'){
    roomRevenue.individualCorp += Number(row.PM_DAY_CREV);
    roomStats.individualCorp += Number(row.PM_DAY_ROOM)
}if (row.GRP_SORT_ORDER ==='S'){
    roomRevenue.package += Number(row.PM_DAY_CREV);
    roomStats.package += Number(row.PM_DAY_ROOM)
}if (row.GRP_SORT_ORDER ==='U'){
    roomRevenue.smerf += Number(row.PM_DAY_CREV);
    roomStats.smerf += Number(row.PM_DAY_ROOM)
}if (row.GRP_SORT_ORDER ==='V'){
    roomRevenue.specialDisc += Number(row.PM_DAY_CREV);
    roomStats.specialDisc += Number(row.PM_DAY_ROOM)
}if (row.GRP_SORT_ORDER ==='W'){
    roomRevenue.specialDisc += Number(row.PM_DAY_CREV);
    roomStats.specialDisc += Number(row.PM_DAY_ROOM)
}if (row.GRP_SORT_ORDER ==='X'){
    roomRevenue.individualCorp += Number(row.PM_DAY_CREV);
    roomStats.individualCorp += Number(row.PM_DAY_ROOM)
}if (row.GRP_SORT_ORDER ==='Z'){
    roomRevenue.smerf += Number(row.PM_DAY_CREV);
    roomStats.smerf += Number(row.PM_DAY_ROOM)
}


 })
.on('end', (lastrow)=>{
    console.log(roomRevenue)
})


    // read the trial balance file
    fs.createReadStream(filepath.trialBalance)
    .on('error', () =>{
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

        // if(row.TRX_TYPE === 'PAYMENT'){
        //     console.log('code: ', row.TRX_CODE)
        //     console.log('amount: ', row.TB_AMOUNT)
        // }
    })
    .on('end', (lastrow)=>{
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
        else fb.restDinner += fb.winnersCircle;
        console.log('///////////////////// Food Revenue ////////////')
        console.log('Restaurant-Breakfast: ', fb.restBreak)
        inputArr[1] = fb.restBreak;
        console.log('Restaurant-Lunch: ', fb.restLunch)
        inputArr[3] = fb.restLunch;
        console.log('Restaurant-Dinner: ', fb.restDinner)
        console.log('Lounge Food: ', fb.loungeFood)
        console.log('Room Service -Breakfast: ', fb.rsBreak)
        console.log('Room Service -Lunch: ', fb.rsLunch)
        console.log('Room Service-Dinner: ', fb.rsDinner)
        console.log('Banquet -Breakfast: ', fb.banqBreak)
        console.log('Banquet -Lunch: ', fb.banqLunch)
        console.log('Banquet -Dinner: ', fb.banqDinner)
        console.log('Banquet -Coffee Break: ', fb.banqCoffee)
        console.log('Banquet - Reception: ', fb.banqRec)
        console.log('Banquet  -Room Rental: ', fb.banqRoom)
        console.log('Banquet  -Equip: ', fb.banqEquip)
        
        console.log('///////////////////// Beverage Revenue ////////////')
        console.log('Lounge-Liquor: ', fb.lLiq)
        console.log('Lounge-Beer: ', fb.lBeer)
        console.log('Lounge-Wine: ', fb.lWine)
        console.log('Restaurant-Liquor: ', fb.rLiq)
        console.log('Restaurant-Beer: ', fb.rBeer)
        console.log('Restaurant-Wine: ', fb.rWine)
        console.log('Banquet-Liquor: ', fb.bLiq)
        console.log('Banquet-Beer: ', fb.bBeer)
        console.log('Banquet-Wine: ', fb.bW)
        console.log('Room Service-Liquor: ', fb.rsLiq)
        console.log('Room Service-Beer: ', fb.rsBeer)
        console.log('Room SErvice-Wine: ', fb.rsWine)

        console.log('///////////////////miscellaneous Other Revenue ///////////')
        console.log('valet Laundry: ')
        console.log('Guest Laundry: ')
        console.log('copy income: ')
        console.log('Gift Shop: ')
        console.log('Misc/Rollaway Income: ')
        console.log('Postage: ')
        

        console.log('//////////////////////////////Taxes///////////////////////////')
        console.log("occupancy tax - 10.5%: ","\t", taxes.occupancy.toFixed(2))
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
    console.log(roomStats)
    return inputArr;
}
module.exports = parser;