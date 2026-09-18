const initialState = {
  movies: [],
  loading: false,
  error: null,

  selectedMovie: null,
  detailsLoading: false,
  detailsError: null,
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case "MOVIES_LOADING":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload,
        error: null,
      };

    case "MOVIES_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "MOVIE_DETAILS_LOADING":
      return {
        ...state,
        detailsLoading: true,
        detailsError: null,
        selectedMovie: null,
      };

    case "MOVIE_DETAILS_SUCCESS":
      return {
        ...state,
        detailsLoading: false,
        detailsError: null,
        selectedMovie: action.payload,
      };

    case "MOVIE_DETAILS_ERROR":
      return {
        ...state,
        detailsLoading: false,
        detailsError: action.payload,
        selectedMovie: null,
      };

    default:
      return state;
  }
};

export default movieReducer;
