import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const registerUser = createAsyncThunk(
  'users/registerUser',
  async ({name, email, account_number}, thunkAPI) => {
    try {
      const response = await fetch(
        'http://localhost:3500/users',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            account_number,
          }),
        }
      );


      let data = await response.json();

      if (response.status === 201) {
        localStorage.setItem('token', data.id);
        return { ...data, username: name, email: email};
      } else {
        return thunkAPI.rejectWithValue(data);
      }

    } catch (e) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
)

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async ({ account_number }, thunkAPI) => {
    try {
      const response = await fetch(
        `http://localhost:3500/users?account_number=${account_number}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: account_number,
            "Content-Type": "application/json",
          },
        }
      );

      let data = await response.json();
      console.log(data)
      if (response.status === 200) {

        localStorage.setItem("token", data[0].id);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

// export const loginUser = createAsyncThunk(
//   'users/login',
//   async ({ account_number }, thunkAPI) => {
//     try {
//       const response = await fetch(
//         'http://localhost:3500/users',
//         {
//           method: 'GET',
//           headers: {
//             Accept: 'application/json',
//             Authorization: account_number,
//             'Content-Type': 'application/json',
//           }
//         }
//       );

//       let data = await response.json();

//       if (response.status === 200) {
//         localStorage.setItem('token', data.id);
//         return data;
//       } else {
//         return thunkAPI.rejectWithValue(data);
//       }
//     } catch (e) {
//       console.log('Error', e.response.data);
//       thunkAPI.rejectWithValue(e.response.data);
//     }
//   }
// );


export const fetchUserBytoken = createAsyncThunk(
  "users/fetchUserByToken",
  async ({ token }, thunkAPI) => {
    try {
      const response = await fetch(
        `http://localhost:3500/users?id=${token}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      let data = await response.json();

      if (response.status === 200) {
        return { ...data[0] };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);



export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    email: "",
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
  },
  extraReducers: {
    [registerUser.fulfilled]: (state, { payload }) => {
      console.log("payload", payload);
      state.isFetching = false;
      state.isSuccess = true;
      state.email = payload.email;
      state.username = payload.name;
    },
    [registerUser.pending]: (state) => {
      state.isFetching = true;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.account_number = payload.account_number;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
    },
    [loginUser.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchUserBytoken.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchUserBytoken.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;

      state.email = payload.email;
      state.username = payload.name;
    },
    [fetchUserBytoken.rejected]: (state) => {
      console.log("fetchUserBytoken");
      state.isFetching = false;
      state.isError = true;
    },
  },
});

export const {clearState} = userSlice.actions;

export const userSelector = (state) => state.user;