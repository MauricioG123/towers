var towers = [];

var difficulty = prompt("How many rings would you like?");
var ring = 1;

function createBoard() {
  for (var i = 0; i < difficulty; i++) {
    towers.push([" " + ring + " ", "   ", "   "]);
    ring++;
  }
}

function iterate() {
  var x = 1;
  var string = towers[0] + "\n";
  for (var i = 1; i < difficulty; i++) {
    var string = string + towers[x] + "\n";
    x++;
  }
  return string;
}

function search(value) {
  var value = value - 1;
  var x = 0;
  var data = [];

  for (var i = 0; i < difficulty; i++) {
    if (towers[x][value] !== "   ") {
      data.push(towers[x][value]);
      data.push(x);
      data.push(value);
      i = difficulty;
    } else {
      data.push(towers[x][value]);
      data.push(x);
      data.push(value);
    }
    x++;
  }
  return data;
}

function replace(columnD, data) {
  var replaceData = search(columnD);

  if (data[data.length - 3] === "   ") {
    var value1 = parseInt(difficulty, 10) + 1;
  } else {
    var value1 = parseInt(data[data.length - 3].trim(), 10);
  }

  if (replaceData[replaceData.length - 3] === "   ") {
    var value2 = parseInt(difficulty, 10) + 1;
  } else {
    var value2 = parseInt(replaceData[replaceData.length - 3].trim(), 10);
  }

  var num = 3;
  var emptySpaceFound = false;

  for (var i = 0; i < difficulty - 1; i++) {
    if (replaceData[replaceData.length - num] === "   ") {
      emptySpaceFound = true;
      break;
    } else {
      num = num + 3;
    }
  }

  if (emptySpaceFound) {
    if (value1 < value2) {
      var x = replaceData[replaceData.length - num + 1];
      var y = replaceData[replaceData.length - num + 2];
    } else {
      return;
    }

    if (x !== undefined && y !== undefined) {
      towers[x].splice(y, 1, " " + value1 + " ");
    }
  } else {
    console.log("No empty space in the target column.");
  }
}

function move(columnF, columnD) {
  var pieceData = search(columnF);
  var x = pieceData[pieceData.length - 2];
  var y = pieceData[pieceData.length - 1];
  towers[x].splice(y, 1, "   ");
  replace(columnD, pieceData);
}

function main() {
  createBoard();
  while (input !== "kill") {
    var board = iterate();
    var input = prompt(board);
    var arrayOfValues = input.split(",");
    var intValue1 = parseInt(arrayOfValues[0].trim());
    var intValue2 = parseInt(arrayOfValues[1].trim());
    move(intValue1, intValue2);
  }
}

main();
