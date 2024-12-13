const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const  recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');

// Funtions to get recipes
const fetchRecipes = async (query)=>{
    recipeContainer.innerHTML = "<h2>Fetching Recipes...</h2>";
try {
  const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
const response = await data.json();

recipeContainer.innerHTML = "";
response.meals.forEach(meal =>{
    // javascript ma div banae 
const recipeDiv = document.createElement('div');
// add class in js for some uses like styling
 recipeDiv.classList.add('recipe');
recipeDiv.innerHTML =
// meal get from foreach and strMealThumb isme api ma img store h
// using backticks
` <img src="${meal.strMealThumb}">
  <h3>${meal.strMeal}</h3>
  <p> <span>${meal.strArea}</span> Dish</p>
  <p>Belongs to <span> ${meal.strCategory}</span> Category</p>
  `
  const button = document.createElement('button');
//   this is button which is shown in the bottom card
  button.textContent = "View Recipe";
  // reason doing appendChild is to add button after above two <p> tag
recipeDiv.appendChild(button);
// Adding event listner to recipe button
    button.addEventListener('click',() =>{
        openRecipePopup(meal);
    })
       // The appendChild method in JavaScript is used to add a new child node to an existing parent node
      recipeContainer.appendChild(recipeDiv); 
    });
  } catch (error) {
    recipeContainer.innerHTML = "<h2> Error in fetching recipes...</h2>";

  }
}
// function to fetch ingredients and measurements
  //  means total no of ingrediets use in making food
const fetchIngredients = (meal) => {
  let ingredientsList ="";
  // using loop to get all ingredients
  for(let i=1; i<=20; i++){
    const ingredient = meal[`strIngredient${i}`];
    if(ingredient){
      const measure = meal[`strMeasure${i}`]
      ingredientsList += `<li>${measure} ${ingredient}</li>`
    }
    else{
      break;
    }
  }
  return ingredientsList;
}

// all details of recipe which we getting in popup
const openRecipePopup = (meal) =>{
    recipeDetailsContent.innerHTML= `
   <h2 class="recipeName">${meal.strMeal}</h2>
   <h3>Ingredients:<h3/>
   <ulclass="ingredientList">${fetchIngredients(meal)}<ul/>
    <divclass="recipeInstructions>
    <h3>Instructions:</h3>
    <p">${meal.strInstructions}</pclass=>
   </div>
   `
   recipeDetailsContent.parentElement.style.display="block";
}
recipeCloseBtn.addEventListener('click',()=>{
  recipeDetailsContent.parentElement.style.display="none";

});
searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
 const searchInput = searchBox.value.trim();
 if(!searchInput){
  recipeContainer.innerHTML = `<h2>Type the meal in the searh box</h2>`;
  return;
 }
    fetchRecipes(searchInput);
}); 