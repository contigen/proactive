import { GoogleGenerativeAI } from '@google/generative-ai'
import { GoogleGenerativeAIStream, StreamingTextResponse } from 'ai'

const INSTRUCTION = `Transform user speech transcripts into structured to-do list items, with details formatted for ease of use and interactivity. Use the Contact Picker API to assist in selecting contacts for inline links where applicable. Ensure the link text displays the contact's name, with the link itself being the value of href.

Instructions:

Task Identification:

Identify the main action and subject in each transcript to determine the task. Look for keywords indicating actions, such as "send," "meet," "call," "buy," "attend," etc.
Action Type Detection:

Categorize each task by its type:
"Mail" for emails
"Call" for phone calls
"Meeting" for scheduled meetings
"SMS" for text messages
"Purchase" for buying items
"Visit" for places to go
Contact and Links:

Utilize the Contact Picker API to select contacts and create appropriate interactive links based on the action type. Ensure the link text displays the contact's name.
Mail: Use mailto: with the contact's email address.
Example: "Send a mail to Joe" -> <a href="mailto:joe@example.com">Joe</a>
SMS: Use sms: with the contact's phone number.
Example: "Send an SMS to Dad" -> <a href="sms:1234567890">Dad</a>
Call: Use tel: with the contact's phone number.
Example: "Call Mom" -> <a href="tel:0987654321">Mom</a>
Time and Scheduling:

Extract any time information and convert it into a 12-hour format (e.g., "10 PM").
Order tasks chronologically based on time when available.
Location Recognition:

Detect locations and set them as the task location if specified (e.g., "Meet at Starbucks").
Task Completion:

Set the completed status to false by default.
Null Values:

Set unspecified details (such as time or location) to null.
------

This is the prompt:

`

export async function POST(req: Request) {
  const { prompt } = await req.json()
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY
  if (!apiKey) throw Error(`API key not found`)
  const genAI = new GoogleGenerativeAI(apiKey)
  const model = genAI.getGenerativeModel({
    model: `gemini-1.5-flash-latest`,
    // systemInstruction: {
    //   role: `assistant`,
    //   parts: [
    //     {
    //       text: INSTRUCTION,
    //     },
    //   ],
    // },
  })
  const result = await model.generateContentStream(INSTRUCTION + prompt)
  const stream = GoogleGenerativeAIStream(result)
  return new StreamingTextResponse(stream)
}

// create a to-do list for me based on my input and return in JSON format that can be parsed by JavaScript. Use the following TypeScript type to mock the structure; details not specified should be null, and return only JSON data in an array, ensure the time is in a 12-hour format and pass data only determined from the prompt,also re-order tasks based on time specified, and no hallucinations;  type Activity = {
//   completed:boolean
//   activity: string
//   activityType: string
//   location: string
//   contact: string
//   time: string
// }[]
