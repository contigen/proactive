'use client'

import { useCompletion } from 'ai/react'
import { Button } from '&/ui/button'
import { useEffect, useRef, useState } from 'react'
import { Activity } from '&/types'
import { Badge } from '&/ui/badge'
import clsx from 'clsx'
import { localStorage } from '&/lib/storage'
import { assignId } from '&/lib/utils'
import { flushSync } from 'react-dom'
import { Spinner } from '&/ui/spinner'
import { Dispatch, SetStateAction } from 'react'
import { Contact } from '../contact'

export function ActivityComponent({
  value,
  isListening,
  setCompletion,
}: {
  value: string
  isListening: boolean
  setCompletion: Dispatch<SetStateAction<string>>
}) {
  const formRef = useRef<HTMLFormElement>(null)
  const [activity, setActivity] = useState<Activity>(
    () => localStorage().getItem() ?? []
  )
  const {
    completion,
    input,
    setInput,
    error,
    stop,
    isLoading,
    handleSubmit,
    handleInputChange,
  } = useCompletion({
    api: `/api/ai`,
    onFinish(_, completion) {
      const jsonActivityString = completion.substring(
        completion.indexOf(`[`),
        completion.lastIndexOf(`]`) + 1
      )
      const parsedAcitivity = JSON.parse(jsonActivityString) as Activity
      const updatedActivity = [...activity, ...parsedAcitivity]
      const reUpdatedActivity = assignId(updatedActivity)
      setActivity(reUpdatedActivity)
    },
  })
  function markAsCompleted(id: number) {
    flushSync(() =>
      setActivity(prevValue =>
        prevValue.map(activity => {
          if (activity.id === id) {
            return { ...activity, completed: !activity.completed }
          }
          return activity
        })
      )
    )
    localStorage().removeItem(id)
  }

  useEffect(() => {
    setCompletion(completion)
  }, [completion, setCompletion])
  useEffect(() => {
    activity && localStorage().setItem(activity)
  }, [activity])
  useEffect(() => {
    setInput(value)
  }, [setInput, value])
  useEffect(() => {
    if (value && !isListening) {
      formRef.current?.requestSubmit()
    }
  }, [isListening, value])
  return (
    <section className='border shadow rounded-3xl p-10 basis-[50%]'>
      <h2 className='text-gray-800'>Your Activities.</h2>
      <form
        onSubmit={evt => {
          handleSubmit(evt)
          setInput(``)
        }}
        className='space-y-4 py-4'
        ref={formRef}
      >
        <input
          value={input}
          placeholder='Enter your prompt ...'
          onChange={handleInputChange}
          className='border-blue-600 border px-2 py-1 caret-blue-700 bubble left'
          required
        />
        <Button
          disabled={isLoading}
          type='submit'
          className='inline-flex gap-2 items-center'
          onClick={() => error && formRef.current?.requestSubmit()}
        >
          {isLoading && Spinner} {error ? `Retry prompt` : `Submit`}
        </Button>

        <div className='flex items-center gap-2'>
          {isLoading && <Button onClick={stop}>Stop</Button>}
          {error?.message && (
            <span className='font-medium tracking-tight text-red-500'>
              {error.message}
            </span>
          )}
        </div>
        <ul className='space-y-4'>
          {activity &&
            activity.map(obj => (
              <li
                key={obj.id}
                className={clsx(
                  `font-semibold border px-4 rounded-xl py-2 w-max`,
                  obj.completed && `line-through`
                )}
              >
                <label className='p-1 inline-block mr-2'>
                  <input
                    type='checkbox'
                    checked={obj.completed}
                    onChange={() => markAsCompleted(obj.id)}
                  />
                </label>
                <sup hidden={!obj.activityType} className='align-text-top'>
                  <Badge className='bg-blue-600 text-white border-none'>
                    {obj.activityType}
                  </Badge>
                </sup>{' '}
                <span hidden={!obj.activity}>{obj.activity}</span>{' '}
                {
                  <time className='text-sm' hidden={!obj.time}>
                    at {obj.time}
                  </time>
                }
                {obj.contact && <Contact contact={obj.contact} />}
                <span hidden={!obj.location}>, {obj.location}</span>
              </li>
            ))}
        </ul>
      </form>
    </section>
  )
}
