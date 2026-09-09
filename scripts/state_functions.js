const gameState = {
    currentRoom: "cell",
    inventory: [],
    visitedRooms: [],
    flags: {}
};

function setFlag(flag, value = true) {
    gameState.flags[flag] = value;
}

function getFlag(flag) {
    return gameState.flags[flag] === true;
}

function collectItem(item) {
    if (!gameState.inventory.includes(item)) {
        gameState.inventory.push(item);
    }
}

function hasItem(item) {
    return gameState.inventory.includes(item);
}

function visitRoom(room) {
    gameState.currentRoom = room;

    if (!gameState.visitedRooms.includes(room)) {
        gameState.visitedRooms.push(room);
    }
}

function hasVisited(room) {
    return gameState.visitedRooms.includes(room);
}

function resetState() {
    gameState.currentRoom = "cell";
    gameState.inventory = [];
    gameState.visitedRooms = [];
    gameState.flags = {};
}