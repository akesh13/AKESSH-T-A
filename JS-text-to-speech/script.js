// // let button = document.querySelector('.speak_btn');
// // button.onClick = () => {
// //     let speech = new SpeechSynthesisUtterance();
// //     let txt = document.querySelector('.enter_text').value;
// //     speech.lang = 'en-US';
// //     speech.text = txt;
// //     speech.rate = 1;
// //     speech.volume = 1;
// //     speech.pitch = 1;

// //     speechSynthesis.speak(speech);
// // }

// const btn = document.querySelector('speak_btn')
// const txt = document.querySelector('enter_text')

// btn.addEventListener('click', () => {
//     playText(txt.value)
// })

// function playText(text) {
//     const utterance = new SpeechSynthesisUtterance(text)
//     // speech.lang = 'en-US';
//     // speech.text = txt;
//     // speech.rate = 1;
//     // speech.volume = 1;
//     // speech.pitch = 1;
//     utterance.rate = 1;
//     utterance.lang = 'en-US';
//     utterance.volume = 1;
//     utterance.pitch = 1;


//     speechSynthesis.speak(utterance)
// }

const playButton = document.getElementById('play-button')
const pauseButton = document.getElementById('pause-button')
const stopButton = document.getElementById('stop-button')
const textInput = document.getElementById('text')
const speedInput = document.getElementById('speed')

playButton.addEventListener('click', ()=> {
    playText(textInput.value)
})
pauseButton.addEventListener('click', pauseText)
stopButton.addEventListener('click', stopText)
function playText(text) {
    if (speechSynthesis.paused && speechSynthesis.speaking) {
        return speechSynthesis.resume()
    }
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = speedInput.value || 1
    utterance.addEventListener('end', ()=> {
        textInput.disabled = false
    })
    textInput.disabled = true
    speechSynthesis.speak(utterance)

}

function pauseText() {
    if(SpeechSynthesis.speaking) speechSynthesis.pause()
}

function stopText() {
    speechSynthesis.resume()
    speechSynthesis.cancel()
}
