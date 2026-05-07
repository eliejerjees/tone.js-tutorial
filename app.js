const startBtn = document.getElementById("start-btn");
const noteDisplay = document.getElementById("note-display");
const noteInfo = document.getElementById("note-info");

const delay = new Tone.FeedbackDelay({
    delayTime: "8n",
    feedback: 0.35,
    wet: 0.25,
}).toDestination();

const reverb = new Tone.Reverb({
    decay: 2,
    wet: 0.25,
}).toDestination();

const synth = new Tone.Synth({
    oscillator: {
        type: "triangle",
    },
    envelope: {
        attack: 0.05,
        decay: 0.2,
        sustain: 0.4,
        release: 0.8,
    },
}).connect(delay).connect(reverb);

const keyboard = new AudioKeys({
    rows: 2,
});

startBtn.addEventListener("click", async () => {
    await Tone.start();

    synth.triggerAttackRelease("C4", "8n");

    noteDisplay.textContent = "C4";
    noteInfo.textContent = "Audio started. Press keys to play.";
});

keyboard.down((key) => {
    synth.triggerAttackRelease(key.frequency, "8n");

    const noteLabel = key.note || `${Math.round(key.frequency)} Hz`;

    noteDisplay.textContent = String(noteLabel);
    noteInfo.textContent = `Frequency: ${Math.round(key.frequency)} Hz`;
});