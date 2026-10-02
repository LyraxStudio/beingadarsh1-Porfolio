const welcome = document.getElementById("welcome");
const visitorInput = document.getElementById("visitor");
const welcomeText = document.getElementById("welcomeText");
const messages = document.getElementById("messages");
const chatInput = document.getElementById("chatInput");
const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}

function closeWelcome() {
    if (welcome) welcome.classList.add("hidden");
}

function continueVisit() {
    if (visitorInput && welcomeText) {
        const name = visitorInput.value.trim();
        if (name) {
            localStorage.setItem("beingadarshVisitor", name);
            welcomeText.textContent = "Welcome, " + name + ". Explore fashion, lifestyle, reviews and creator content.";
        }
    }
    closeWelcome();
}

window.addEventListener("load", function () {
    const savedName = localStorage.getItem("beingadarshVisitor");
    if (savedName && welcomeText) {
        welcomeText.textContent = "Welcome back, " + savedName + ". Explore fashion, lifestyle, reviews and creator content.";
        closeWelcome();
    }
});

const closeBtn = document.getElementById("closeWelcome");
if (closeBtn) closeBtn.addEventListener("click", closeWelcome);

const enterBtn = document.getElementById("enterBtn");
if (enterBtn) enterBtn.addEventListener("click", continueVisit);

if (visitorInput) {
    visitorInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") continueVisit();
    });
}

function escapeHtml(text) {
    return String(text).replace(/[&<>"']/g, function (mark) {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        }[mark];
    });
}

const knowledge = [
    { keys: ["instagram", "follow", "reel", "reels"], reply: "Follow BEING ADARSH on Instagram: https://www.instagram.com/_beingadarsh1/" },
    { keys: ["business", "collab", "collaboration", "email", "work"], reply: "For business and collabs, email adarshbeing01@gmail.com" },
    { keys: ["store", "faym", "shop", "product"], reply: "Product links are on the FAYM store: https://faym.co/i/_beingadarsh1" },
    { keys: ["fashion", "outfit", "style", "dress"], reply: "Fashion series is in the Reels section and on Instagram." },
    { keys: ["sneaker", "shoes"], reply: "Sneaker finds are posted as Reels. Open the Sneaker Finds card." },
    { keys: ["hello", "hi", "hey"], reply: "Hey. Ask about Instagram, fashion, the store, or collabs." }
];

function getReply(question) {
    const q = question.toLowerCase();
    for (let i = 0; i < knowledge.length; i++) {
        for (let k = 0; k < knowledge[i].keys.length; k++) {
            if (q.includes(knowledge[i].keys[k])) {
                return knowledge[i].reply;
            }
        }
    }
    return "I can help with Instagram, fashion, the store, or collabs. Try one of those words.";
}

function askAI() {
    if (!chatInput || !messages) return;
    const value = chatInput.value.trim();
    if (!value) return;

    messages.innerHTML += '<div class="msg user">' + escapeHtml(value) + "</div>";
    messages.innerHTML += '<div class="msg">' + escapeHtml(getReply(value)) + "</div>";
    messages.scrollTop = messages.scrollHeight;
    chatInput.value = "";
}

const sendBtn = document.getElementById("sendBtn");
if (sendBtn) sendBtn.addEventListener("click", askAI);

if (chatInput) {
    chatInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") askAI();
    });
}