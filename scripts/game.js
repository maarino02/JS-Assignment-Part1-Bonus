/**
 * ESCAPE THE EVIL AI! - Bonus Text Adventure Assignment
 */

// Inform player about developer console requirements prior to gameplay
function showConsoleInstructions() {
    alert(
        "=== WELCOME TO 'ESCAPE THE EVIL AI!' ===\n\n" +
        "IMPORTANT GAME INSTRUCTIONS:\n" +
        "1. This text adventure outputs detailed room logs and story clues to your Browser Console.\n" +
        "2. How to open the Developer Console:\n" +
        "   - Windows: Press F12 (or Ctrl + Shift + I), then click the 'Console' tab.\n" +
        "   - Mac: Press Cmd + Option + I, then click the 'Console' tab.\n" +
        "3. Keep the console visible alongside dialog popups for the best experience!\n\n" +
        "4. Type 'quit' anytime to leave the game.\n\n" +
        "Click OK to begin your escape!"
    );

    console.clear();
    console.log("%c=== ESCAPE THE EVIL AI - GAME INITIALIZED ===", "color: #00ff00; font-weight: bold; font-size: 14px;");
    console.log("Follow the prompt options on screen and check this console for real-time progress logs.");
}

// Room 1: Holding Cell
function processCell() {
    const validChoices = ["bed", "vent", "door"];
    const invStatus = gameState.inventory.length > 0 ? gameState.inventory.join(", ") : "None";
    
    const message = 
        `--- HOLDING CELL ---\n` +
        `You are trapped inside a high-tech prison cell.\n` +
        `Inventory: [${invStatus}]\n\n` +
        `What would you like to inspect?\n` +
        `-> 'bed' (Check the metallic mattress)\n` +
        `-> 'vent' (Inspect the loose ventilation grate)\n` +
        `-> 'door' (Try the electronic security door)`;

    const action = getChoice(message, validChoices);
    if (action === null) return "cancel";
    if (action === "quit") return "quit";

    if (action === "bed") {
        if (!hasItem("wire")) {
            collectItem("wire");
            alert("Searching the mattress... You found a conductive COPPER WIRE!");
            console.log("[ITEM COLLECTED] Copper Wire added to inventory.");
        } else {
            alert("You search the bed again, but there is nothing else here.");
            console.log("[ACTION] Inspected bed. Nothing new found.");
        }
    } else if (action === "vent") {
        if (!getFlag("knowsCode")) {
            setFlag("knowsCode", true);
            alert("You peek inside the ventilation grate. Etched on the wall is a passcode: '404'!");
            console.log("[CLUE DISCOVERED] Security Passcode: 404.");
        } else {
            alert("The vent wall still reads: 'Passcode: 404'.");
            console.log("[ACTION] Inspected vent again. Passcode is 404.");
        }
    } else if (action === "door") {
        if (hasItem("wire")) {
            alert("You use the copper wire to short-circuit the electronic door lock! The door slides open with a hiss.");
            console.log("[PUZZLE SOLVED] Cell door lock bypassed using copper wire.");
            tryMoveTo("corridor");
        } else {
            alert("The cell door is electronically sealed tight. You need something conductive (like a wire) to bypass the lock!");
            console.log("[LOCKED] Cell door requires a conductive wire.");
        }
    }

    return "continue";
}

// Room 2: Security Corridor
function processCorridor() {
    const validChoices = ["west", "east", "north", "terminal"];
    const invStatus = gameState.inventory.length > 0 ? gameState.inventory.join(", ") : "None";
    const laserStatus = getFlag("laserDisarmed") ? "DISABLED (Safe)" : "ACTIVE (Dangerous Red Beams!)";

    const message = 
        `--- SECURITY CORRIDOR ---\n` +
        `Security Lasers: ${laserStatus}\n` +
        `Inventory: [${invStatus}]\n\n` +
        `Where do you want to go?\n` +
        `-> 'west' (Return to your Cell)\n` +
        `-> 'east' (Enter the Maintenance Hub)\n` +
        `-> 'north' (Proceed to the AI Core Server Room)\n` +
        `-> 'terminal' (Inspect the corridor security panel)`;

    const action = getChoice(message, validChoices);
    if (action === null) return "cancel";
    if (action === "quit") return "quit";

    if (action === "west") {
        tryMoveTo("cell");
    } else if (action === "east") {
        tryMoveTo("maintenance");
    } else if (action === "terminal") {
        if (getFlag("laserDisarmed")) {
            alert("The security terminal confirms: 'LASER DEFENSE SYSTEM IS DISARMED'.");
            console.log("[TERMINAL] Security lasers are already disarmed.");
        } else {
            if (getFlag("knowsCode")) {
                alert("You type the passcode '404' into the terminal...\n\nACCESS GRANTED! Security lasers de-energize.");
                setFlag("laserDisarmed", true);
                console.log("[PUZZLE SOLVED] Disarmed corridor lasers using passcode 404.");
            } else {
                alert("The terminal requests a 3-digit security passcode. You don't know the code yet!\n(Hint: Maybe check clues in your cell)");
                console.log("[LOCKED] Security terminal requires passcode.");
            }
        }
    } else if (action === "north") {
        if (!getFlag("laserDisarmed")) {
            // Unsuccessful Ending 1
            alert(
                "DANGER! You attempt to rush into the AI Core while the red laser grid is active!\n\n" +
                "Automated defense turrets detect your movement and lock down the sector. You are captured by the Evil AI!\n\n" +
                "=== GAME OVER (UNSUCCESSFUL OUTCOME) ==="
            );
            console.log("%c[DEFEAT] Player walked into active laser grid.", "color: #ff0000; font-weight: bold;");
            return "defeat_lasers";
        } else {
            tryMoveTo("server");
        }
    }

    return "continue";
}

// Room 3: Maintenance Hub
function processMaintenance() {
    const validChoices = ["west", "desk", "breaker"];
    const invStatus = gameState.inventory.length > 0 ? gameState.inventory.join(", ") : "None";

    const message = 
        `--- MAINTENANCE HUB ---\n` +
        `A hum of power fills this storage room lined with server breakers.\n` +
        `Inventory: [${invStatus}]\n\n` +
        `What do you want to inspect?\n` +
        `-> 'west' (Return to the Security Corridor)\n` +
        `-> 'desk' (Search the administrator's desk)\n` +
        `-> 'breaker' (Pull the main power breaker switch)`;

    const action = getChoice(message, validChoices);
    if (action === null) return "cancel";
    if (action === "quit") return "quit";

    if (action === "west") {
        tryMoveTo("corridor");
    } else if (action === "desk") {
        if (!hasItem("keycard")) {
            collectItem("keycard");
            alert("Searching drawers... You found the MASTER ACCESS KEYCARD!");
            console.log("[ITEM COLLECTED] Master Access Keycard added to inventory.");
        } else {
            alert("The desk is empty now. You already took the Master Access Keycard.");
            console.log("[ACTION] Inspected desk again.");
        }
    } else if (action === "breaker") {
        if (!getFlag("laserDisarmed")) {
            setFlag("laserDisarmed", true);
            alert("CLANK! You pull the heavy power breaker. The corridor security lasers shut off!");
            console.log("[PUZZLE SOLVED] Disarmed corridor lasers by pulling the main breaker.");
        } else {
            alert("The breaker is already tripped. The corridor lasers are off.");
            console.log("[ACTION] Breaker already flipped.");
        }
    }

    return "continue";
}

// Room 4: AI Core / Server Room
function processServer() {
    const validChoices = ["south", "red button", "exit"];
    const invStatus = gameState.inventory.length > 0 ? gameState.inventory.join(", ") : "None";

    const message = 
        `--- AI CORE / SERVER ROOM ---\n` +
        `You stand in the nerve center of the Evil AI. Glowing supercomputers line the walls.\n` +
        `Inventory: [${invStatus}]\n\n` +
        `What do you want to do?\n` +
        `-> 'south' (Return to the Security Corridor)\n` +
        `-> 'red button' (Press the glowing RED BUTTON on the AI terminal)\n` +
        `-> 'exit' (Use the heavy Emergency Blast Exit door)`;

    const action = getChoice(message, validChoices);
    if (action === null) return "cancel";
    if (action === "quit") return "quit";

    if (action === "south") {
        tryMoveTo("corridor");
    } else if (action === "red button") {
        // Unsuccessful Ending 2
        alert(
            "You slam your palm on the glowing Red Button!\n\n" +
            "A loud voice booms over the speakers: 'MWAHAHAHA! FOOLISH HUMAN! THAT WAS A BAIT BUTTON!'\n\n" +
            "Blast doors drop down, trapping you inside the AI Core forever while the AI taunts your mistake!\n\n" +
            "=== GAME OVER (UNSUCCESSFUL OUTCOME) ==="
        );
        console.log("%c[DEFEAT] Player fell for the AI's red button bait.", "color: #ff0000; font-weight: bold;");
        return "defeat_trap";
    } else if (action === "exit") {
        if (hasItem("keycard")) {
            // Successful Ending
            alert(
                "You swipe the MASTER ACCESS KEYCARD across the scanner...\n\n" +
                "BEEP! BEEP! 'ACCESS GRANTED. OVERRIDING EVIL AI DEFENSES.'\n\n" +
                "The heavy blast doors slide open, revealing cool fresh air and daylight!\n" +
                "You sprint outside to freedom, outsmarting the Evil AI once and for all!\n\n" +
                "=== CONGRATULATIONS! YOU ESCAPED! (VICTORY) ==="
            );
            console.log("%c[VICTORY] Player escaped using Master Access Keycard!", "color: #00ff00; font-weight: bold;");
            return "victory";
        } else {
            alert(
                "The Emergency Blast Exit is locked by a high-security keycard scanner!\n" +
                "You need the Master Access Keycard from the Maintenance Hub to open it."
            );
            console.log("[LOCKED] Exit requires Master Access Keycard.");
        }
    }

    return "continue";
}

// Main Game Engine Loop
function game() {
    showConsoleInstructions();

    let playAgain = true;

    while (playAgain) {
        resetState();
        console.log("[GAME START] State initialized in location 'cell'.");

        let gameStatus = "continue";

        while (gameStatus === "continue") {
            if (gameState.currentRoom === "cell") {
                gameStatus = processCell();
            } else if (gameState.currentRoom === "corridor") {
                gameStatus = processCorridor();
            } else if (gameState.currentRoom === "maintenance") {
                gameStatus = processMaintenance();
            } else if (gameState.currentRoom === "server") {
                gameStatus = processServer();
            }
        }
        if (gameStatus === "quit") {
            playAgain = false;
            alert("You quit the game.");
            console.log("[QUIT] Player quit the adventure.");
            break;
        }
        if (gameStatus === "cancel") {
            alert("Game cancelled. You gave up escaping the Evil AI!");
            console.log("[CANCEL] Game session ended by player.");
        }

        // Offer replay using confirm() edit: only if the game was not quit
        if (gameStatus !== "quit") {
            playAgain = confirm(
                "The adventure has ended! Would you like to play again?"
            );
        }
    }

    alert("Thanks for playing 'Escape the Evil AI!' Goodbye!");
    console.log("[GAME OVER] Player exited the game loop.");
}

// Auto-run when document loads
window.addEventListener("load", function () {
    game();
});
