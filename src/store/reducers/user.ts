import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserState {
  logged: boolean;
  credentials: {
    email: string;
    password: string;
  };
  pseudo: string;
}
export const initialState: UserState = {
  logged: false,
  credentials: {
    email: '',
    password: '',
  },
  pseudo: '',
};

type LoginCredentials = { email: string; password: string };

export const logginCheck = createAsyncThunk(
  'user/login',
  async (credentials: LoginCredentials) => {
    const { data } = await axios.post<{ pseudo: string }>(
      'https://orecipes-api.onrender.com/api/login',
      credentials
    );
    return data;
  }
);

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeField(
      state,
      // Mon payload ne va plus être une simple chaine de caractère mais un objet
      action: PayloadAction<{
        // fieldName correspondra au nom du champ à modifier (email ou password)
        // keyof permet de récupérer la liste des propriétés d'un type
        fieldName: keyof UserState['credentials'];
        // value correspondra à la valeur à mettre dans le champ
        value: string;
      }>
    ) {
      // state.credentials.email = action.payload;
      // state.credentials['email'] = action.payload;
      // const monChampAModifier = 'email';
      // state.credentials[monChampAModifier] = action.payload;
      // Je récupère depuis mon payload le nom du champ à modifier et sa valeur
      const { fieldName, value } = action.payload;
      state.credentials[fieldName] = value;
    },

    handleLogin(state) {
      state.logged = true;
    },

    handleLogout(state) {
      state.logged = false;
      state.pseudo = '';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(logginCheck.pending, (state) => {
        state.logged = false;
      })
      .addCase(logginCheck.fulfilled, (state, action) => {
        state.logged = true;
        state.pseudo = action.payload.pseudo;
      })
      .addCase(logginCheck.rejected, (state) => {
        state.logged = false;
      });
  },
});

export const { changeField, handleLogin, handleLogout } = userReducer.actions;

export default userReducer.reducer;
