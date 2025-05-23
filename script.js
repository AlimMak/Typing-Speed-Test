const typingTestSentences = [
    "The quick brown fox jumps over the lazy dog.",
    "Pack my box with five dozen liquor jugs.",
    "How vexingly quick daft zebras jump!",
    "Bright vixens jump; dozy fowl quack.",
    "The five boxing wizards jump quickly.",
    "Crazy Fredrick bought many very exquisite opal jewels.",
    "We promptly judged antique ivory buckles for the next prize.",
    "A wizard's job is to vex chumps quickly in fog.",
    "Watch 'Jeopardy!', Alex Trebek's fun TV quiz game.",
    "By Jove, my quick study of lexicography won a prize!",
    "The sky was clear and the stars were bright as we sailed.",
    "She wrote him a long letter but he didn't read it.",
    "Two seats were vacant on the crowded bus this morning.",
    "The mysterious diary records the voice of the ghost.",
    "The stranger officiates the meal in the diner every evening.",
    "The shooter says goodbye to his love before leaving for war.",
    "I want to buy a onesie but know it won't suit me.",
    "I checked to make sure that he was still alive.",
    "They got there early and they got really good seats.",
    "I would have gotten the promotion but my attendance wasn't good enough.",
    "I am happy to take your donation; any amount will be greatly appreciated.",
    "I was very proud of my nickname throughout high school.",
    "She works two jobs to make ends meet; at least that was her reason.",
    "The book is in front of the table near the window.",
    "The memory we used to share is no longer coherent.",
    "He turned in the research paper on Friday; otherwise he would have failed.",
    "If I don't like something, I'll stay away from it.",
    "She borrowed the book from him many years ago and hasn't returned it.",
    "The body may perhaps compensates for the loss of a true metaphysics.",
    "I often see the time 11:11 or 12:34 on clocks.",
    "The river stole the gods from the mountain peak.",
    "Writing a list of random sentences is harder than I initially thought.",
    "The waves were crashing on the shore; it was a lovely sight.",
    "The clock within this blog and the clock on my laptop are not synchronized.",
    "Let me help you with your baggage while we wait for the taxi.",
    "The beauty of the sunset was obscured by the industrial cranes.",
    "I think I will buy the red car, or I will lease the blue one.",
    "The old apple revels in its authority as it falls from the tree.",
    "We have never been to Asia, nor have we visited Africa.",
    "She did her best to help him overcome his difficulties.",
    "The mysterious disappearance of the statue remains unsolved.",
    "The lake is a long way from here, at least three hours by car.",
    "Sometimes it is better to just walk away from things.",
    "The light in his life was actually a fire burning all around him.",
    "Wednesday is hump day, but has anyone asked the camel if he's happy about it?",
    "He told us a very exciting adventure story during dinner.",
    "Italy is my favorite country; in fact, I plan to spend two weeks there next year.",
    "The secret code they created was impossible to crack.",
    "He didn't want to go to the dentist, yet he went anyway.",
    "An apple day has great nutritional value for your body. "
];


// DOM elements
const newButton = document.getElementById("newTestButton");
const textInput = document.getElementById("typingInput");
const sentenceDisplay = document.getElementById("sentenceDisplay");
const timerDisplay = document.getElementById("Timer");
const resetButton = document.getElementById("resetButton");

// Game state
let currentSentence = "";
let timerStarted = false;
let intervalId;
let startTime;

// Initialize
newButton.addEventListener("click", newSentence);
resetButton.addEventListener("click", resetCurrent);
textInput.addEventListener("input", handleInput);
textInput.addEventListener("paste", preventPaste);
textInput.addEventListener("drop", preventPaste);
newSentence(); // start with sentence loaded

function handleInput() {
    if (!timerStarted) {
        startTimer();
    }
    
    // Check completion
    if (textInput.value === currentSentence) {
        stopTimer();
        textInput.disabled = true;
        getWPM();
        highlightCharacters(); 
    } else {
        highlightCharacters(); 
    }
}


function highlightCharacters() {
    const spans = sentenceDisplay.querySelectorAll("span");
    const input = textInput.value;
    
    spans.forEach((span, index) => {
        span.className = "letterSpans";
        
        // Highlight current character
        if (index < input.length) {
            span.classList.add(input[index] === currentSentence[index] ? "correct" : "wrong");
        }
        
        // Highlight the current position
        if (index === input.length) {
            span.classList.add("current");
        }
    });
}
 
function getSentence(){
    return typingTestSentences[Math.trunc(Math.random() * typingTestSentences.length)]
}

function newSentence() {
    // Reset
    if (timerStarted) {
        stopTimer();
    }
    textInput.value = "";
    textInput.disabled = false;
    timerDisplay.textContent = "0";

    // new sentence
    currentSentence = getSentence();
    sentenceDisplay.innerHTML = ""; // Clear previous

    // make spans for each character
    for (let char of currentSentence) {
        const newSpan = document.createElement("span");
        newSpan.classList.add("letterSpans");
        newSpan.textContent = char;
        if (char === " ") {  //  <-------  Add this check
            newSpan.classList.add("space"); //  <-------  Add this line
        }
        sentenceDisplay.appendChild(newSpan);
    }
    textInput.focus();
    document.getElementById("WPM").textContent = "WPM ";
}


function injectSpans(){
    let injectSentence = getSentence()
    for (let char of injectSentence){
        newSpan = document.createElement("span")
        newSpan.textContent = char;
        document.getElementById("sentenceDisplay").appendChild(newSpan);
    }
}


function startTimer() {
    timerStarted = true;
    startTime = Date.now();
    
    intervalId = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        timerDisplay.textContent = elapsed + "s";
    }, 1000);
}

function stopTimer() {
    clearInterval(intervalId);
    timerStarted = false;
    
    // Calculate final time
    const finalTime = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`Completed in ${finalTime} seconds`);
}


function getWPM(){
    console.log(currentSentence.length);
    let WPM = 0;
    time = parseInt(timerDisplay.textContent) / 60;
    WPM = Math.round(((currentSentence.length) / 5) / time);
    console.log(WPM);
    document.getElementById("WPM").textContent = "WPM " + WPM;
}

function preventPaste(e){
    e.preventDefault();
}

function resetCurrent(){
    timerStarted = false;
    stopTimer()
    textInput.disabled = false;
    textInput.value = "";
    timerDisplay.textContent = 0;
    highlightCharacters();
    textInput.focus();
    document.getElementById("WPM").textContent = "WPM ";
}









