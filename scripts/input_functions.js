function getChoice(message, validChoices) {
    while (true) {
        let input = prompt(message);
        if (input === null) {
            return null;
        }
        input = input.trim().toLowerCase();
        if (validChoices.includes(input)) {
            return input;
        }
        alert("Invalid choice. Please try again.");
    }
}