// Function to get the string and parse it to unique characters
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
            prob: prob,
            low : lastHigh,
            high : lastHigh + prob
        };
        lastHigh += prob;
    })
    displayTable(dictionary);
    startEncoding(text, dictionary);
    outputDiv.style.display = "flex";
}

// Function with the iterration to solve the arithmetic code
function startEncoding(text, dictionary){
    let currentLow = 0.0;
    let currentHigh = 1.0;
    let steps = [];

    // get the unique character from the dictionary
    let uniqueChars = Object.keys(dictionary);

    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        let range = currentHigh - currentLow;

        // count the sub interval for all the character for this iteration
        let subIntervalAtThisStep = {};
        uniqueChars.forEach(uc => {
            subIntervalAtThisStep[uc] = {
            low : currentLow + (range * dictionary[uc].low),
            high : currentLow + (range * dictionary[uc].high)
            };
        });

        steps.push({
            letter : char,
            rangeBefore: { low: currentLow, high: currentHigh},
            subIntervals: subIntervalAtThisStep
        });

        // Update the value
        let nextLow = subIntervalAtThisStep[char].low;
        let nextHigh = subIntervalAtThisStep[char].high;

        currentLow = nextLow;
        currentHigh = nextHigh;
    }
    displaySteps(steps);
    document.getElementById('finalResult').innerText =
    `Final Interval  : [${currentLow} - ${currentHigh})`;
}

function displayTable(dictionary){
    let html = "<table border='1'><tr><th>Character</th><th>Probability</th><th>Low</th><th>High</th></tr>";
    for (let char in dictionary){
        html += `<tr>
                    <td>${char}</td>
                    <td>${dictionary[char].prob}</td>
                    <td>${dictionary[char].low.toFixed(3)}</td>
                    <td>${dictionary[char].high.toFixed(3)}</td>
                </tr>`
    }
    html += "</table>";
    document.getElementById('probabilityTable').innerHTML = html;
}

function displaySteps(steps){
    let html = "";

    steps.forEach((s, index) => {
        html += `<div style="margin-bottom: 20px; padding: 10px; border: 1px solid #3c3836;">`
        html += `<h4>Steps ${index+1}: Character '${s.letter}'</h4>`;
        html += `<p>Divide the range [${s.rangeBefore.low.toFixed(6)}, ${s.rangeBefore.high.toFixed(6)}) into:</p>`;

        html += `<table border='1' style="width: 100%; text-align: left;">
                <tr>
                    <th>Character</th>
                    <th>Sub-Interval (low)</th>
                    <th>Sub-Interval (high)</th>
                    <th>Status</th>
                </tr>`

        for (let char in s.subIntervals) {
            let isTarget = (char === s.letter) ? "style='background-color: #3c3836; font-weight: bold;'" : "";
            let label = (char === s.letter) ? "<- Selected" : "";
            
            html += `<tr ${isTarget}>
                        <td>${char}</td>
                        <td>${s.subIntervals[char].low.toFixed(8)}</td>
                        <td>${s.subIntervals[char].high.toFixed(8)}</td>
                        <td>${label}</td>
                    </tr>`;
        }
        html += "</table></div>";
    });
    document.getElementById('iterationLog').innerHTML = html;
}