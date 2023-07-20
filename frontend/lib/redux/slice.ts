import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "./store";
import { IInitialState } from "./InitialState";
import { User } from "../types/user";
import { Tweet } from "../types/tweet";

const initialState: IInitialState = {
  token: "",
  profile: {
    _id: "",
    avatarPath: "",
    backgroundPath: "",
    bio: "",
    following: [],
    follows: [],
    name: "",
    savedTweets: [],
  },
  recentTweets: [],
  topHashtags: [],
  topUsers: [],
};

export const appSlice = createSlice({
  name: "tweeter clone",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | undefined>) => {
      state.token =
        action.payload == undefined ? undefined : `Bearer ${action.payload}`;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.profile = action.payload;
    },
    setFollowing: (state, action: PayloadAction<Array<User>>) => {
      if (state.profile != undefined) {
        state.profile.following = action.payload;
      }
    },
    setFollowers: (state, action: PayloadAction<Array<User>>) => {
      if (state.profile != undefined) {
        state.profile.follows = action.payload;
      }
    },
    setSavedTweets: (state, action: PayloadAction<Array<Tweet>>) => {
      if (state.profile != undefined) {
        state.profile.savedTweets = action.payload;
      }
    },
    setTopUsers: (state, action: PayloadAction<Array<User>>) => {
      if (state.topUsers.length >= 20) {
        let eliminationNumber = action.payload.length - state.topUsers.length;
        state.topUsers.splice(action.payload.length, eliminationNumber);
      }
      state.topUsers = action.payload.concat(state.topUsers);
    },
    setTopHashtags: (state, action: PayloadAction<Array<string>>) => {
      if (state.topHashtags.length >= 5) {
        let eliminationNumber =
          action.payload.length - state.topHashtags.length;
        state.topUsers.splice(action.payload.length, eliminationNumber);
      }
      state.topHashtags = action.payload.concat(state.topHashtags);
    },
    setRecentTweets: (state, action: PayloadAction<Array<Tweet>>) => {
      if (state.recentTweets.length >= 100) {
        let eliminationNumber =
          action.payload.length - state.recentTweets.length;
        state.topUsers.splice(action.payload.length, eliminationNumber);
      }
      state.recentTweets = action.payload.concat(state.recentTweets);
    },
    closeSession: (state) => {
      state.profile = {
        _id: "",
        avatarPath: "",
        backgroundPath: "",
        bio: "",
        following: [],
        follows: [],
        name: "",
        savedTweets: [],
      };
      state.recentTweets = [];
      state.token = undefined;
    },
  },
});

export const {
  setToken,
  setFollowers,
  closeSession,
  setFollowing,
  setRecentTweets,
  setSavedTweets,
  setTopHashtags,
  setTopUsers,
  setUser,
} = appSlice.actions;
export default appSlice.reducer;
