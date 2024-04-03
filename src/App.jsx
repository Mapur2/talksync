import { useState } from 'react'
import { } from 'regenerator-runtime/runtime'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './App.css'

function App() {
  const [text, setText] = useState("")

  const [whileHear, setHear] = useState(false)
  const [copied, setCopied] = useState(false)

  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    resetTranscript,
  } = useSpeechRecognition();
  const startListening = () => {
    setCopied(false)
    SpeechRecognition.startListening({ continuous: true, language: 'en-IN' })
  }
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleSpeech = () => {
    const value = new SpeechSynthesisUtterance(transcript)
    window.speechSynthesis.speak(value)

  }

  const copy = () => {
    setCopied(true)
    var copyText = document.getElementById("text").innerText;
    // Copy the text inside the text field
    navigator.clipboard.writeText(transcript);
  }
  return (
    <>
      <div className='main'>
        <h1>TalkSync</h1>
        <blockquote>Your text to speech and speech to text converter</blockquote>
        <textarea name="" cols="30" rows="10" id="text" value={transcript}></textarea>
        <div className='btns' >

          {!listening?(<button onClick={startListening}>Start Listening</button>):
            (<button className='stoplisten' onClick={() => {
              SpeechRecognition.stopListening()
              setCopied(false)
            }}>Stop Listening</button>)}

          <button onClick={handleSpeech}>Read Aloud</button>
          <button onClick={() => {
            resetTranscript()
            setCopied(false)
          }}>Clear Text</button>
          <button onClick={copy}>{copied ? "Text Copied !" : "Copy Text"}</button>
        </div>
      </div>
    </>
  )
}

export default App
