import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Button } from './ui/button'

type TelContact = {
  tel: string[]
}

export function Contact({ contact }: { contact: string }) {
  const [contacts, setContacts] = useState<TelContact[] | null>(null)
  async function selectContacts() {
    if (!(`contacts` in navigator)) {
      return
    }
    navigator.vibrate?.(200)
    try {
      const selectedContacts: TelContact[] = await navigator.contacts.select(
        [`tel`],
        {
          multiple: true,
        }
      )
      setContacts(selectedContacts)
    } catch (err: any) {}
  }

  return (
    <>
      <Button
        onClick={selectContacts}
        className='border-blue-600 border bg-blue-400/15 text-blue-600 rounded-xl px-2 py-px'
      >
        {contact}
      </Button>
      {contacts?.map((contact, idx) => (
        <b key={idx}>
          {contact.tel[0]}
          <br />
        </b>
      ))}
    </>
  )
}
