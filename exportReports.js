const robot = require('robotjs');

function exportReports() {
  robot.setKeyboardDelay(200);
  robot.setMouseDelay(200);
  // minimize vs code
  robot.dragMouse(844, 17);
  robot.mouseClick();
  // click in the middle of the opera window
  robot.dragMouse(536, 397);
  robot.mouseClick();
  // close anything that might be opened
  robot.keyToggle('c', 'down', 'alt');
  robot.keyToggle('c', 'up', 'alt');
  robot.keyToggle('c', 'down', 'alt');
  robot.keyToggle('c', 'up', 'alt');
  // miscelaneous
  robot.dragMouse(905, 113);
  robot.mouseClick();
  robot.dragMouse(908, 110);
  robot.mouseClick();
  robot.dragMouse(904, 112);
  robot.mouseClick();
  robot.dragMouse(914, 102);
  robot.mouseClick();

  // reports
  robot.dragMouse(79, 194);
  robot.mouseClick();
  // click on report field
  robot.dragMouse(441, 240);
  robot.mouseClick();
  // search for flash reports
  robot.typeString('flash');
  robot.keyTap('enter');
  // click print to file
  robot.dragMouse(434, 606);
  robot.mouseClick();
  // file form selection
  robot.dragMouse(745, 608);
  robot.mouseClick();
  // delimited Data
  robot.dragMouse(754, 712);
  robot.mouseClick();
  // Select Delimiter
  robot.dragMouse(814, 634);
  robot.mouseClick();
  // select : as Delimiter
  robot.dragMouse(714, 688);
  robot.mouseClick();
  // click ok
  robot.dragMouse(730, 694);
  robot.mouseClick();
  // click file
  robot.dragMouse(620, 490);
  robot.mouseClick();
  // save to automating flash directory for parser to find
  robot.keyTap('y');
  robot.keyTap('backspace');
  robot.typeString('C:\\Users\\msemroska.denlw\\Documents\\automating flash');
  robot.keyTap('enter');
  // Wait for reports to export and click yes 3 times
  robot.setKeyboardDelay(25000);
  robot.keyTap('y');
  robot.keyTap('y');
  robot.keyTap('y');
  robot.keyTap('y');
}

module.exports = exportReports;
