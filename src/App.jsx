import { useState } from 'react'
import chef_img from './assets/chef_img.jpeg'
import { getRecipe } from "./ai"
import './App.css'

function App() {

  const[ingredients, setIngredients] = useState([])
  const[recipe, setRecipe] = useState()
  const[ingredient, setIngredient] = useState('')

  async function generateRecipe() {
    const recipeText = await getRecipe(ingredients)
    setRecipe(recipeText)
}

  function handleSearch() {
  if (ingredient === "") return
  setIngredients([...ingredients, ingredient])
  setIngredient('')
}

  const IngredientList = ingredients.map(item => (
    <li key={item}>{item}</li>
  )) 


    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 py-6">
      <div className="flex justify-center items-center gap-3 bg-white/80 backdrop-blur shadow-lg rounded-full mx-4 md:mx-20 p-3 border border-amber-200">
      <img src={chef_img}
           className="w-14 md:w-20 rounded-full object-cover"></img>
      <h1 className="text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">CHEF GROQ</h1>
      </div>
      <div className='flex flex-col md:flex-row gap-3 justify-center items-center px-4 mt-8'>
      <input  id="ingredient-input" value={ingredient} placeholder='e.g oregano' onChange={(event) => setIngredient(event.target.value)} type="text"  className='border border-amber-300 bg-white rounded-xl p-3 w-full md:w-[420px] shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400' />
      <button onClick={handleSearch} className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 px-6 rounded-xl shadow-lg hover:scale-105 transition">Add ingredient</button>
      </div>
      {ingredients.length>0 &&
      <ul className='mx-6 md:mx-30 my-6 list-disc bg-white rounded-2xl shadow-md p-6 max-w-2xl md:mx-auto'>{IngredientList}</ul>
}
      {ingredients.length>0 &&
      <div className='flex justify-center px-4'>
        <button onClick={generateRecipe} className='bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl shadow-xl p-4 px-10 hover:scale-105 transition font-semibold'>View recipe</button>
      </div>
      
}
{recipe && (
  <div className="mx-4 md:mx-20 mt-10 bg-white rounded-3xl shadow-2xl border border-amber-200 p-6 md:p-8">
    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-orange-600">🍳 Your AI Recipe</h2>
    <pre className="whitespace-pre-wrap text-gray-700 leading-7 font-sans">{recipe}</pre>
  </div>
)}
  </div>
  );

}
export default App
