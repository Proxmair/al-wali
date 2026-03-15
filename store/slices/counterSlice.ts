import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  value: number;
  favourite: {
    ids: number[];
    count: number;
  };
  cart: {
    ids: number[];
    count: number;
  };
}

const initialState: CounterState = {
  value: 0,
  favourite: {
    ids: [],
    count: 0,
  },
  cart: {
    ids: [],
    count: 0,
  }
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    // Existing counter actions
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    setValue: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },

    // FAVOURITE actions
    addFavourite: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      if (!state.favourite.ids.includes(id)) {
        state.favourite.ids.push(id);
        state.favourite.count = state.favourite.ids.length;
      }
    },

    removeFavourite: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.favourite.ids = state.favourite.ids.filter((favId) => favId !== id);
      state.favourite.count = state.favourite.ids.length;
    },

    toggleFavourite: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      if (state.favourite.ids.includes(id)) {
        state.favourite.ids = state.favourite.ids.filter((favId) => favId !== id);
      } else {
        state.favourite.ids.push(id);
      }
      state.favourite.count = state.favourite.ids.length;
    },

   toggleCart: (state, action: PayloadAction<number>) => {
  const id = action.payload;

  if (state.cart.ids.includes(id)) {
    state.cart.ids = state.cart.ids.filter((cartId) => cartId !== id);
  } else {
    state.cart.ids.push(id);
  }

  // FIX
  state.cart.count = state.cart.ids.length;
},

    clearFavourites: (state) => {
      state.favourite.ids = [];
      state.favourite.count = 0;
    },
  },
});

export const {
  increment,
  decrement,
  setValue,
  addFavourite,
  removeFavourite,
  toggleFavourite,
  clearFavourites,
  toggleCart
} = counterSlice.actions;

export default counterSlice.reducer;