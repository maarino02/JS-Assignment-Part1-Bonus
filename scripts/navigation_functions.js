function moveTo(room) {
    visitRoom(room);
    console.log(`\n========================================`);
    console.log(`LOCATION MOVED TO: ${room.toUpperCase()}`);
    console.log(`========================================`);
}

function canEnter(room) {
    if (room === "corridor" && !hasItem("wire")) {
        console.log("The cell door is locked. You need a wire to short-circuit the electronic mechanism.");
        return false;
    }
    return true;
}

function tryMoveTo(room) {
    if (canEnter(room)) {
        moveTo(room);
        return true;
    }
    return false;
}