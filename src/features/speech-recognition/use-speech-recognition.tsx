import { stateField } from '&/types'
import { useState, useRef } from 'react'
import firstAudioUrl from './sounds/audio-start.mp3'
import secondAudioUrl from './sounds/audio-end.mp3'
let audioStart: HTMLAudioElement | undefined
let audioEnd: HTMLAudioElement | undefined

let Recognition: SpeechRecognition | undefined
if (typeof window !== `undefined`) {
  Recognition =
    new window.webkitSpeechRecognition() || new window.SpeechRecognition()
  audioStart = new Audio()
  audioEnd = new Audio()
}

audioStart && (audioStart.src = firstAudioUrl)
audioEnd && (audioEnd.src = secondAudioUrl)

export function useSpeechRecognition(cb?: (transcript: string) => void) {
  const [transcript, setTranscript] = useState({
    preview: ``,
    note: ``,
    listening: false,
    noMatch: false,
  })
  const [speechErrMessage, setSpeechErrMessage] = useState(``)
  const finalTranscriptRef = useRef(``)

  type transcriptType = typeof transcript
  const updateStateConfig = (stateValue: stateField<transcriptType>) => {
    setTranscript(prev => ({ ...prev, ...stateValue }))
  }
  const speechRecVarsRef = useRef({
    clicked: false,
    stopped: false,
  })

  const startSpeechRec = () => {
    // calling Recognition.start() more than once throws an error
    if (!speechRecVarsRef.current.clicked) {
      Recognition?.start()
      audioEnd?.pause()
      audioEnd!.currentTime = 0
      audioStart?.play()
      updateStateConfig({ listening: true })
      speechRecVarsRef.current.clicked = true
      speechRecVarsRef.current.stopped = false
    }
  }
  const stopSpeechRec = () => {
    if (speechRecVarsRef.current.clicked) {
      audioStart?.pause()
      audioStart!.currentTime = 0
      audioEnd?.play()
      Recognition?.stop()
      updateStateConfig({ listening: false })
      setSpeechErrMessage(``)
      speechRecVarsRef.current.clicked = false
      speechRecVarsRef.current.stopped = true
    }
  }
  if (Recognition) {
    Recognition.continuous = true
    Recognition.interimResults = true

    Recognition.onaudiostart = () => {
      updateStateConfig({ listening: true })
    }
    Recognition.onaudioend = () => {
      updateStateConfig({ listening: false })
    }
    Recognition.onnomatch = () => {
      updateStateConfig({ noMatch: true })
    }
    Recognition.onresult = evt => {
      updateStateConfig({ noMatch: false })
      const speechRecResult = evt.results
      let idx = evt.resultIndex
      const currentSpeechResult = speechRecResult[idx]
      const currentSpeechTranscript = speechRecResult[idx][0].transcript.trim()
      setTranscript(prev => {
        return { ...prev, preview: currentSpeechTranscript }
      })
      // if recognised speech sounds like a complete sentence, then add it to the note.
      if (currentSpeechResult.isFinal) {
        finalTranscriptRef.current += currentSpeechTranscript
        setTranscript(prev => {
          return {
            ...prev,
            note: prev.note + ` ` + currentSpeechTranscript,
          }
        })
      }
    }

    Recognition.onend = () => {
      if (speechRecVarsRef.current.stopped) {
        cb?.(finalTranscriptRef.current)
        setTimeout(() => (finalTranscriptRef.current = ``))
        return
      }
      Recognition.start()
      speechRecVarsRef.current.clicked = true
      updateStateConfig({ listening: true })
    }

    Recognition.onerror = evt => {
      !speechRecVarsRef.current.stopped && setSpeechErrMessage(evt.error)
    }
  }

  return {
    transcript,
    setTranscript,
    speechErrMessage,
    startSpeechRec,
    stopSpeechRec,
  }
}
