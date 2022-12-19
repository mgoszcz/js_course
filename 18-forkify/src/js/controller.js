import * as model from './model.js';
import recipeView from './views/recipeView.js';

// import icons to have it working after parcle

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;

    recipeView.renderSipnner();
    // 1. Loading data
    await model.loadRecipe(id);

    // 2. Rendering data
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

// Recipe URL: http://localhost:1234/#5ed6604591c37cdc054bc886
// Selecting recipe will change # in uRL, set up event when hash changes to load recipe
// load recipe when loading page is done (to display hash)
['load', 'hashchange'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);
