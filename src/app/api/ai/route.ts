import { GoogleGenerativeAI } from '@google/generative-ai'
import { GoogleGenerativeAIStream, StreamingTextResponse } from 'ai'

export async function POST(req: Request) {
  const { prompt } = await req.json()
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY
  if (!apiKey) throw Error(`API key not found`)
  const genAI = new GoogleGenerativeAI(apiKey)
  const model = genAI.getGenerativeModel({
    model: `gemini-1.5-flash-latest`,
    systemInstruction: {
      role: `assistant`,
      parts: [
        {
          text: `create a to-do list for me based on my input and return in JSON format that can be parsed by JavaScript. Use the following TypeScript type to mock the structure; details not specified should be null, and return only JSON data in an array, ensure the time is in a 12-hour format and pass data only determined from the prompt,also re-order tasks based on time specified, and no hallucinations;  type Activity = {
            completed:boolean
            activity: string
            activityType: string
            location: string
            contact: string
            time: string
          }[]`,
        },
      ],
    },
  })
  const result = await model.generateContentStream(prompt)
  const stream = GoogleGenerativeAIStream(result)
  return new StreamingTextResponse(stream)
}
