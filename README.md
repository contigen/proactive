# ProActive

ProActive is a to-do list web app with speech recongiton & AI to help avoid the mental inertia that occurs as a result of planning out one's day. Just speak your tasks and the App listens using the Web Speech API, sends the transcript to the AI service, and the tasks are generated.

This was a solo & rushed project, don't mind that.

## Current Features

- Translate transcript into tasks with streaming support using Google Gemini AI & Vercel AI SDK
- Interactive Links: Utilizes the Contact Picker API to generate clickable links for emails, calls, and SMS.
- Space key to start speech recognition
- Local storage persistence of tasks

## Potential Features

PWA for native-app like feel with push notifications for timed tasks
Refine ability to inline links
Send mail on tasks' completion

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE.txt) file for details.

## Support

For any issues or questions, please open an issue on the GitHub repository.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
