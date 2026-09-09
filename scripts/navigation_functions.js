function moveTo(room) {
    visitRoom(room);
    console.log(`You moved to: ${room}`);
}

function canEnter(room) {
    if (room === "exit" && !hasItem("key")) {
        return false;
    }

    return true;
}

function tryMoveTo(room) {
    if (canEnter(room)) {
        moveTo(room);
        return true;
    }

    console.log("You can't go there yet.");
    return false;
}