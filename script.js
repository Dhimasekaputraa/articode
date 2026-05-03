function solveArithmetic(){
    const text = document.getElementById('userInput').value.toLowerCase();
    const outputDiv = document.getElementById('outputSection')
    if (!text) {
        outputDiv.style.display = "none";
        return
    };

    // Count the character frequency
    let freq = {};
    for (let char of text) {
        freq[char] = (freq[char] || 0) + 1;
    }

    // Interval dictionary
    let dictionary = {};
    let lastHigh = 0;
    const len = text.length;

    // use set to get unique character based on their sequence
    let uniqueChars = [...new Set(text)];

    uniqueChars.forEach(char =>{
        let prob = freq[char] / len;
        dictionary[char] = {
            low : lastHigh,
            high : lastHigh + prob
        };
        lastHigh += prob;
    })
    displayTable(dictionary);
    startEncoding(text, dictionary);
    outputDiv.style.display = "flex";
}

function startEncoding(text, dictionary){
    let currentLow = 0.0;
    let currentHigh = 1.0;
    let steps = [];

    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        let charLow = dictionary[char].low;
        let charHigh = dictionary[char].high;
        let range = currentHigh - currentLow;

        // Update the value
        currentHigh = currentLow + (range * charHigh);
        currentLow = currentLow + (range * charLow);

        steps.push({
            letter : char,
            low : currentLow,
            high : currentHigh
        });
    }
    displaySteps(steps);
    document.getElementById('finalResult').innerText =
    `Final Interval  : [${currentLow} - ${currentHigh})`;
}

function displayTable(dictionary){
    let html = "<table border='1'><tr><th>Character</th><th>Low</th><th>High</th></tr>";
    for (let char in dictionary){
        html += `<tr><td>${char}</td><td>${dictionary[char].low.toFixed(3)}</td><td>${dictionary[char].high.toFixed(3)}</td></tr>`
    }
    html += "</table>";
    document.getElementById('probabilityTable').innerHTML = html;
}

function displaySteps(steps){
    let html = "<table border='1'><tr><th>Step</th><th>Character</th><th>Low</th><th>High</th></tr>";
    steps.forEach((s, index) => {
        html += `<tr><td>${index + 1}</td><td>${s.letter}</td><td>${s.low}</td><td>${s.high}</td></tr>`;
    });
    html += "</table>"
    document.getElementById('iterationLog').innerHTML = html;
}