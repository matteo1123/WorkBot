const robot = require('robotjs');

// for(let i =0; i< 10; i++){
//     robot.dragMouse(9, 56);
//     robot.dragMouse(50, 15);
// }

// robot.keyToggle('tab', 'down','alt')
function enter(arr){
    robot.setKeyboardDelay(1);    

    robot.dragMouse(1042, 66);
    robot.mouseClick()
    arr.forEach((val)=>{
        if(val - Math.round(val) > 0){
            robot.typeString(val.toFixed(2))
        }else{
            robot.typeString(val.toString());
        }
        robot.keyTap("enter")
    })
}
module.exports = enter;