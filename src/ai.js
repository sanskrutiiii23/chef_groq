import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
})

export async function getRecipe(ingredients) {
  const prompt = `
Create a recipe using these ingredients:
${ingredients.join(", ")}

Return:
1. Recipe Name
2. Ingredients
3. Step-by-step Instructions
`

  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "llama-3.3-70b-versatile",
  })

  return completion.choices[0].message.content
}