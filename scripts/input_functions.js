function getChoice(message, validChoices) {
    while (true) {
        let input = prompt(message);
        if (input === null) {
            return null; // Player clicked Cancel
        }
        input = input.trim().toLowerCase();
        if (input === "quit") {
           return "quit";
        }
        if (validChoices.includes(input)) {
            return input;
        }
        alert(`Invalid choice: "${input}"\n\nPlease enter one of the following valid options:\n-> ${validChoices.join(", ")}`);
    }
}