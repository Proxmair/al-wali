import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
  favourite: {
    ids: string[];
    count: number;
  };
  cart: {
    ids: string[];
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
  },
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    // Counter actions
    increment: (state) => {
      state.value += 1;
    },

    decrement: (state) => {
      state.value -= 1;
    },

    setValue: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },

    // Favourite actions
    addFavourite: (state, action: PayloadAction<string>) => {
      const id = action.payload;

      if (!state.favourite.ids.includes(id)) {
        state.favourite.ids.push(id);
      }

      state.favourite.count = state.favourite.ids.length;
    },

    removeFavourite: (state, action: PayloadAction<string>) => {
      const id = action.payload;

      state.favourite.ids = state.favourite.ids.filter(
        (favId) => favId !== id
      );

      state.favourite.count = state.favourite.ids.length;
    },

    toggleFavourite: (state, action: PayloadAction<string>) => {
      const id = action.payload;

      if (state.favourite.ids.includes(id)) {
        state.favourite.ids = state.favourite.ids.filter(
          (favId) => favId !== id
        );
      } else {
        state.favourite.ids.push(id);
      }

      state.favourite.count = state.favourite.ids.length;
    },

    clearFavourites: (state) => {
      state.favourite.ids = [];
      state.favourite.count = 0;
    },

    // Cart actions
    addCart: (state, action: PayloadAction<string>) => {
      const id = action.payload;

      if (!state.cart.ids.includes(id)) {
        state.cart.ids.push(id);
      }

      state.cart.count = state.cart.ids.length;
    },

    removeCart: (state, action: PayloadAction<string>) => {
      const id = action.payload;

      state.cart.ids = state.cart.ids.filter(
        (cartId) => cartId !== id
      );

      state.cart.count = state.cart.ids.length;
    },

    toggleCart: (state, action: PayloadAction<string>) => {
      const id = action.payload;

      if (state.cart.ids.includes(id)) {
        state.cart.ids = state.cart.ids.filter(
          (cartId) => cartId !== id
        );
      } else {
        state.cart.ids.push(id);
      }

      state.cart.count = state.cart.ids.length;
    },

    clearCart: (state) => {
      state.cart.ids = [];
      state.cart.count = 0;
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

  addCart,
  removeCart,
  toggleCart,
  clearCart,
} = counterSlice.actions;

export default counterSlice.reducer;