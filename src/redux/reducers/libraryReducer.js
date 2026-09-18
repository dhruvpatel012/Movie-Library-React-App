const getStoredLibrary = () => {
  try {
    const storedLibrary = localStorage.getItem("cineviaLibrary");

    return storedLibrary
      ? JSON.parse(storedLibrary)
      : {
          favorites: [],
          watchlist: [],
        };
  } catch {
    return {
      favorites: [],
      watchlist: [],
    };
  }
};

const initialState = getStoredLibrary();

const saveLibrary = (state) => {
  localStorage.setItem("cineviaLibrary", JSON.stringify(state));
};

const libraryReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case "ADD_FAVORITE":
      newState = {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
      break;

    case "REMOVE_FAVORITE":
      newState = {
        ...state,
        favorites: state.favorites.filter(
          (movie) => movie.id !== action.payload,
        ),
      };
      break;

    case "ADD_WATCHLIST":
      newState = {
        ...state,
        watchlist: [...state.watchlist, action.payload],
      };
      break;

    case "REMOVE_WATCHLIST":
      newState = {
        ...state,
        watchlist: state.watchlist.filter(
          (movie) => movie.id !== action.payload,
        ),
      };
      break;

    default:
      return state;
  }

  saveLibrary(newState);

  return newState;
};

export default libraryReducer;
