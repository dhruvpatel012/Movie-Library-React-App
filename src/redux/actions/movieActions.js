import {
  fetchPopularMovies,
  searchMovies,
  fetchMovieDetails,
} from "../../services/movieApi";

export const getPopularMovies = () => async (dispatch) => {
  dispatch({
    type: "MOVIES_LOADING",
  });

  try {
    const movies = await fetchPopularMovies();

    dispatch({
      type: "MOVIES_SUCCESS",
      payload: movies,
    });
  } catch (error) {
    dispatch({
      type: "MOVIES_ERROR",
      payload: error.message,
    });
  }
};

export const searchMovieList = (query) => async (dispatch) => {
  dispatch({
    type: "MOVIES_LOADING",
  });

  try {
    const movies = await searchMovies(query);

    dispatch({
      type: "MOVIES_SUCCESS",
      payload: movies,
    });
  } catch (error) {
    dispatch({
      type: "MOVIES_ERROR",
      payload: error.message,
    });
  }
};

export const getMovieDetails = (imdbId) => async (dispatch) => {
  dispatch({
    type: "MOVIE_DETAILS_LOADING",
  });

  try {
    const movie = await fetchMovieDetails(imdbId);

    dispatch({
      type: "MOVIE_DETAILS_SUCCESS",
      payload: movie,
    });
  } catch (error) {
    dispatch({
      type: "MOVIE_DETAILS_ERROR",
      payload: error.message,
    });
  }
};
