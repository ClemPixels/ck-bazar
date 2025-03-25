// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   productData: [],
//   userInfo: null,
//   isLoggedIn: false,
// };

// export const bazarSlice = createSlice({
//   name: "bazar",
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       const item = state.productData.find(
//         (item) => item._id === action.payload._id
//       );

//       if (item) {
//         item.quantity += action.payload.quantity;
//       } else {
//         state.productData.push(action.payload);
//       }
//     },
//     deleteItem: (state, action) => {
//       state.productData = state.productData.filter(
//         (item) => item._id !== action.payload
//       );
//     },
//     resetCart: (state) => {
//       state.productData = [];
//     },
//     increamentQuantity: (state, action) => {
//       const item = state.productData.find(
//         (item) => item._id === action.payload._id
//       );
//       if (item) {
//         item.quantity++;
//       }
//     },
//     decreamentQuantity: (state, action) => {
//       const item = state.productData.find(
//         (item) => item._id === action.payload._id
//       );
//       if (item.quantity === 1) {
//         item.quantity = 1;
//       } else {
//         item.quantity--;
//       }
//     },
//     addUser: (state, action) => {
//       state.userInfo = action.payload;
//       state.isLoggedIn = true;
//     },
//     removeUser: (state) => {
//       state.userInfo = null;
//       state.isLoggedIn = false;
//     },
//   },
// });

// export const {
//   addToCart,
//   deleteItem,
//   resetCart,
//   increamentQuantity,
//   decreamentQuantity,
//   addUser,
//   removeUser,
// } = bazarSlice.actions;
// export default bazarSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userCarts: {}, // Store carts tied to specific users
  tempCart: [], // Temporary cart for non-logged-in users
  userInfo: null, // Currently logged-in user's info
  isLoggedIn: false, // Login state
};

export const bazarSlice = createSlice({
  name: "bazar",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (state.isLoggedIn && state.userInfo) {
        const userId = state.userInfo.uid;
        state.userCarts[userId] = state.userCarts[userId] || [];
        const item = state.userCarts[userId].find(
          (item) => item._id === action.payload._id
        );
        if (item) {
          item.quantity += action.payload.quantity;
        } else {
          state.userCarts[userId].push(action.payload);
        }
      } else {
        const item = state.tempCart.find(
          (item) => item._id === action.payload._id
        );
        if (item) {
          item.quantity += action.payload.quantity;
        } else {
          state.tempCart.push(action.payload);
        }
      }
    },
    deleteItem: (state, action) => {
      const targetCart = state.isLoggedIn
        ? state.userCarts[state.userInfo.uid]
        : state.tempCart;
      state.userCarts[state.userInfo.uid] = targetCart.filter(
        (item) => item._id !== action.payload
      );
    },
    resetCart: (state) => {
      if (state.isLoggedIn && state.userInfo) {
        state.userCarts[state.userInfo.uid] = [];
      } else {
        state.tempCart = [];
      }
    },
    removeTempCart: (state) => {
      state.tempCart = [];
    },
    increamentQuantity: (state, action) => {
      const targetCart = state.isLoggedIn
        ? state.userCarts[state.userInfo.uid]
        : state.tempCart;
      const item = targetCart.find((item) => item._id === action.payload._id);
      if (item) {
        item.quantity++;
      }
    },
    decreamentQuantity: (state, action) => {
      const targetCart = state.isLoggedIn
        ? state.userCarts[state.userInfo.uid]
        : state.tempCart;
      const item = targetCart.find((item) => item._id === action.payload._id);
      if (item && item.quantity > 1) {
        item.quantity--;
      }
    },
    addUser: (state, action) => {
      state.userInfo = action.payload;
      state.isLoggedIn = true;
      state.userCarts[state.userInfo.uid] =
        state.userCarts[state.userInfo.uid] || [];
    },
    removeUser: (state) => {
      state.userInfo = null;
      state.isLoggedIn = false;
      state.tempCart = [];
    },
    loadUserCart: (state, action) => {
      const { userCart, userId } = action.payload;
      state.userCarts[userId] = userCart;
    },
  },
});

export const {
  addToCart,
  deleteItem,
  resetCart,
  increamentQuantity,
  decreamentQuantity,
  addUser,
  removeUser,
  loadUserCart,
  removeTempCart,
} = bazarSlice.actions;

export default bazarSlice.reducer;
