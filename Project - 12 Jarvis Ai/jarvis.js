const btn = document.querySelector('.talk');
const content = document.querySelector('.content');
let recognition;
let isListening = false;

function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    const day = new Date();
    const hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Good Morning Sir...,How can i help you?");
    } else if (hour >= 12 && hour < 18) {
        speak("Good Afternoon Sir...,How can i help you?");
    } else {
        speak("Good Evening Sir...,How can i help you?");
    }
}

function startRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
        const currentIndex = event.resultIndex;
        const transcript = event.results[currentIndex][0].transcript;
        content.textContent = transcript;
        if (event.results[event.results.length - 1].isFinal) {
            takeCommand(transcript.toLowerCase());
        }
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        content.textContent = 'Speech recognition error.';
        isListening = false;
        btn.classList.remove('listening');
    };

    recognition.onend = () => {
        if (isListening) {
            recognition.start();
        } else {
            btn.classList.remove('listening');
        }
    };

    recognition.start();
    isListening = true;
    btn.classList.add('listening');
}

function stopRecognition() {
    if (recognition) {
        recognition.stop();
        isListening = false;
        btn.classList.remove('listening');
    }
}

btn.addEventListener('click', () => {
    if (isListening) {
        stopRecognition();
        content.textContent = "Click here to speak";
    } else {
        startRecognition();
        content.textContent = 'Listening...';
    }
});

speak('Initializing JARVIS...');
wishMe();

function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Sir, How May I Help You?");
    } else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    } else if (message.includes("open youtube")) {
        window.open("https://www.youtube.com/", "_blank");
        speak("Opening Youtube...");
    } else if (message.includes("open chatGPT")) {
        window.open("https://openai.com/chatgpt/overview/", "_blank");
        speak("Opening ChatGPT...");
    } else if (message.includes("open whatsapp")) {
        window.open("https://web.whatsapp.com/", "_blank");
        speak("Opening Whatsapp...");
    } else if (message.includes("open my linkedin")) {
        window.open("https://www.linkedin.com/in/reddy-santosh-kumar-a5b9622a2/", "_blank");
        speak("Opening Linkedin...");
    } else if (message.includes("open my projects")) {
        window.open("https://github.com/Santosh-Reddy1310/Projects", "_blank");
        speak("Opening Projects...");
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what I found on the internet regarding " + message;
        speak(finalText);
    } else if (message.includes(' go to wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
        const finalText = "This is what I found on Wikipedia regarding " + message;
        speak(finalText);
    } else if (message.includes('time')) {
        const time = new Date().toLocaleTimeString();
        speak(`The current time is ${time}`);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleDateString();
        speak(`Today's date is ${date}`);
    } else if (message.includes('day')) {
        const day = new Date().toLocaleDateString(undefined, { weekday: 'long' });
        speak(`Today is ${day}`);
    } else if (message.includes('month')) {
        const month = new Date().toLocaleDateString(undefined, { month: 'long' });
        speak(`The current month is ${month}`);
    } else if (message.includes('year')) {
        const year = new Date().getFullYear();
        speak(`The current year is ${year}`);
    } else if (message.includes('thank you') || message.includes('thanks')) {
        speak("You're welcome, Sir.");
    } else if (message.includes('goodbye') || message.includes('see you again') || message.includes('bye') || message.includes('take rest')) {
        speak("Goodbye, Sir. Have a great day.");
        stopRecognition();
        content.textContent = "Click here to speak";
        try {
            window.close();
        } catch (e) {
            console.log("Window could not be closed.");
        }
    } else if (message.includes('search for')) {
        const searchTerm = message.replace('search for', '').trim();
        window.open(`https://www.google.com/search?q=${searchTerm.replace(" ", "+")}`, "_blank");
        const finalText = "Searching for " + searchTerm + " on Google.";
        speak(finalText);
    } else if (message.includes('open gemini')) {
        window.open("https://gemini.google.com/", "_blank");
        speak("Opening Gemini...");
    } else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on Google";
        speak(finalText);
    }
}