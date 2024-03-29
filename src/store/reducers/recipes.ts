import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Recipe } from '../../@types/recipe';

interface RecipesState {
  list: Recipe[];
  isLoading: boolean;
}
export const initialState: RecipesState = {
  list: [],
  isLoading: false,
};

export const fetchRecipes = createAsyncThunk('recipes/fetch', async () => {
  const { data } = await axios.get<Recipe[]>(
    'https://orecipes-api.onrender.com/api/recipes'
  );
  return data;
});

const recipesReducer = createSlice({
  name: 'recipes',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.list = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchRecipes.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export default recipesReducer.reducer;
