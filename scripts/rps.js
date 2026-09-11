const gameState = { currentRoom: "cell", inventory: [], visitedRooms: [], flags: {} };

function collectItem(item) { 
    if (!gameState.inventory.includes(item)) 
        gameState.inventory.push(item);
}

function hasItem(item) {
    return gameState.inventory.includes(item); 

}

function tryMoveTo(room) {
    if (room === "exit" && !hasItem("key")) 
        return false; 
    
    gameState.currentRoom = room; 
    return true;
}

function evaluateCondition(action) {
    if (gameState.currentRoom === "cell") 
        return processCell(action);
    if (gameState.currentRoom === "corridor") 
        return processCorridor(action);
    if (gameState.currentRoom === "server") 
        return processServer(action);
}

function processCell(action) {
    if (action.includes("bed") && !hasItem("wire")) 
        {collectItem("wire"); 
            return "Wire found.";}
    if (action.includes("door") && hasItem("wire")) 
        {tryMoveTo("corridor"); 
            return "Moved to corridor."; }
    
    return action.includes("door") ? "Door needs power." : "In a cell. Look at 'bed' or 'door'.";
}

function processCorridor(action) {
    if (action.includes("panel") && !getFlag("powerOn")) 
        {setFlag("powerOn", true); 
            return "Power on."; }
    if (action.includes("north") && getFlag("powerOn")) 
        {tryMoveTo("server"); 
            return "Moved to server."; }
    
    return action.includes("north") ? "Door sealed." : "In corridor. Look at 'panel' or 'north'.";
}

function processServer(action) {
    if (action.includes("terminal") && !hasItem("key")) 
        {collectItem("key"); return "Key acquired!"; }
    if (action.includes("exit") && hasItem("key")) 
        {tryMoveTo("exit"); return "Escape successful!"; }
    
    return action.includes("exit") ? "Exit locked." : "In AI core. Look at 'terminal' or 'exit'.";
}