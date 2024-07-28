'use client'

import { ActivityComponent } from './activity-component'
import { useSpeechRecognition } from '../speech-recognition/use-speech-recognition'
import { useEffect, useState } from 'react'
import { clsx } from 'clsx'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

export function ActivityInterface() {
  const [isListening, setIsListening] = useState(false)
  const [completion, setCompletion] = useState(``)
  useEffect(() => {
    const handleKeyDown = (evt: KeyboardEvent) => {
      if (evt.code === `Space`) {
        setIsListening(prev => !prev)
      }
    }
    document.addEventListener(`keydown`, handleKeyDown)
    return () => {
      document.removeEventListener(`keydown`, handleKeyDown)
    }
  }, [])

  const { startSpeechRec, stopSpeechRec, transcript } = useSpeechRecognition()
  useEffect(() => {
    if (isListening) {
      startSpeechRec()
    } else {
      stopSpeechRec()
    }
    return () => {
      stopSpeechRec()
    }
  }, [isListening])
  return (
    <div className='flex px-8 md:px-20 gap-6 flex-col md:flex-row'>
      <section className='border rounded-3xl shadow p-10'>
        {transcript.listening ? (
          <Button className='bg-black text-white' onClick={stopSpeechRec}>
            Stop Listening
          </Button>
        ) : (
          <Button onClick={startSpeechRec}>Start Listening</Button>
        )}
        <h3 className='my-4 text-gray-800 tracking-[-.04em]'>
          You can toggle the&nbsp;
          <span
            className={clsx(
              `rounded-lg border-2 border-black/80 px-1 text-xl transition-colors duration-300 ease-in-out`,
              isListening && `border-gray-700 text-gray-700`
            )}
          >
            Spacebar
          </span>
          &nbsp;to start or stop speech recognition.
        </h3>
        {transcript.listening && (
          <div>
            <p>{transcript.preview}</p>
            <h3>
              Listening in <Badge>{navigator.language}</Badge>
            </h3>
          </div>
        )}
        <h3>
          <span className='bg-gradient-to-b from-neutral-900 to-zinc-500 bg-clip-text text-transparent [-webkit-background-clip:text]'>
            Completion result:
          </span>
          {completion}
        </h3>
      </section>
      <ActivityComponent
        value={transcript.note}
        isListening={isListening}
        setCompletion={setCompletion}
      />
    </div>
  )
}
