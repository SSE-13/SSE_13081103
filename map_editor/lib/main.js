"use strict";
const fs = require('fs');
var history_row = new Array();
var history_color = new Array();
var history_value = new Array();
function readFile() {
    var map_path = __dirname + "/map.json";
    var content = fs.readFileSync(map_path, "utf-8");
    var obj = JSON.parse(content);
    var mapData = obj.map;
    return mapData;
}
function writeFile() {
    console.log(mapData);
    var map_path = __dirname + "/map.json";
    var json = "{\"map\":" + JSON.stringify(mapData) + "}";
    fs.writeFileSync(map_path, json, "utf-8");
    //console.log(json);
    // console.log("saved");
}
function createMapEditor() {
    var world = new editor.WorldMap();
    var rows = mapData.length;
    var cols = mapData[0].length;
    for (var col = 0; col < rows; col++) {
        for (var row = 0; row < cols; row++) {
            var tile = new editor.Tile();
            tile.setWalkable(mapData[row][col]);
            tile.x = col * editor.GRID_PIXEL_WIDTH;
            tile.y = row * editor.GRID_PIXEL_HEIGHT;
            tile.ownedCol = col;
            tile.ownedRow = row;
            tile.width = editor.GRID_PIXEL_WIDTH;
            tile.height = editor.GRID_PIXEL_HEIGHT;
            world.addChild(tile);
            eventCore.register(tile, events.displayObjectRectHitTest, onTileClick);
        }
    }
    return world;
}
var Save = (localPoint, displayObject) => {
    if (localPoint.x >= 0 && localPoint.x <= 100 && localPoint.y >= 0 && localPoint.y <= 50)
        return true;
};
var Undo = (localPoint, displayObject) => {
    if (localPoint.x >= 0 && localPoint.x <= 100 && localPoint.y >= 0 && localPoint.y <= 50)
        return true;
};
function UndoFunction() {
    if (history_row.length <= 0) {
        alert("已撤销至最后一步");
        return;
    }
    else {
        var r = history_row.pop();
        var c = history_color.pop();
        mapData[r][c] = history_value.pop();
    }
}
function onTileClick(tile) {
    // console.log(tile);
    console.log(tile.ownedRow + " " + tile.ownedCol + " " + mapData[tile.ownedRow][tile.ownedCol]);
    history_row.push(tile.ownedRow);
    history_color.push(tile.ownedCol);
    history_value.push(mapData[tile.ownedRow][tile.ownedCol]);
    mapData[tile.ownedRow][tile.ownedCol] = mapData[tile.ownedRow][tile.ownedCol] ? 0 : 1;
    tile.setWalkable(mapData[tile.ownedRow][tile.ownedCol]);
    console.log(tile.ownedRow + " " + tile.ownedCol + " " + mapData[tile.ownedRow][tile.ownedCol]);
}
function onSaveClick() {
    writeFile();
}
function onUndoClick() {
    UndoFunction();
}
var mapData = readFile();
var renderCore = new render.RenderCore();
var eventCore = new events.EventCore();
eventCore.init();
var mainContainer = new render.DisplayObjectContainer();
var button1 = new render.Bitmap();
button1.source = "save1.png";
button1.y = 250;
var button2 = new render.Bitmap();
button2.source = "undo.png";
button2.x = 150;
button2.y = 250;
var editor = createMapEditor();
mainContainer.addChild(button1);
mainContainer.addChild(button2);
mainContainer.addChild(editor);
renderCore.start(mainContainer, ["save1.png", "undo.png"]);
eventCore.register(button1, Save, onSaveClick);
eventCore.register(button2, Undo, onUndoClick);
