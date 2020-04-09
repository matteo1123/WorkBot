const robot = require('robotjs');
for(let i =0; i< 10; i++){
    robot.dragMouse(50, 150);
    robot.dragMouse(50, 15);
}

robot.keyToggle('tab', 'down','alt')