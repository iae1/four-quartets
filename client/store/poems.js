import axios from "axios";

//ACTION CONSTANTS
const SET_POEMS = "SET_POEMS";
const SET_SINGLE_POEM = "SET_SINGLE_POEM";

//ACTION CREATOR
export const setPoems = poems => {
  return {
    type: SET_POEMS,
    poems
  };
};

export const setSinglePoem = poem => {
  return {
    type: SET_SINGLE_POEM,
    poem
  };
};

//THUNK CREATOR
export const fetchPoems = () => {
  return async dispatch => {
    try {
      const { data: poems } = await axios.get("/api/poems/");
      dispatch(setPoems(poems));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchSinglePoem = poemId => {
  return async dispatch => {
    try {
      const { data: poem } = await axios.get(`/api/poems/${poemId}`);
      dispatch(setSinglePoem(poem));
    } catch (error) {
      console.log(error);
    }
  };
};

//INITIAL STATE
const initState = {
  allPoems: [],
  singlePoem: {}
};

export default function poemsReducer(state = initState, action) {
  switch (action.type) {
    case SET_POEMS:
      return { ...state, allPoems: [...action.poems] };
    case SET_SINGLE_POEM:
      return { ...state, singlePoem: action.poem };
    default:
      return state;
  }
}
