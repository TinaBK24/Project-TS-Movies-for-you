import './style.css'
import { movies } from './movies'

const moviesContainer = document.querySelector('#movies_container') as HTMLElement;
const moviesInput = document.querySelector('#movies_input') as HTMLInputElement;
const searchBtn = document.querySelector('#search_btn') as HTMLInputElement;
const yearUp = document.querySelector('#year_up') as HTMLElement;
const yearDown = document.querySelector('#year_down') as HTMLElement;
const bestRate = document.querySelector('#best_rate') as HTMLElement;
const genreFilter = document.querySelector('#genre_filter') as HTMLSelectElement;
const addMovieBtn = document.querySelector('#add_movie_btn') as HTMLInputElement;
const noResultsMessage = document.querySelector('#no_results') as HTMLElement;

const newMovieTitle = document.querySelector('#new_movie_title') as HTMLInputElement;
const newMovieYear = document.querySelector('#new_movie_year') as HTMLInputElement;
const newMovieDirector = document.querySelector('#new_movie_director') as HTMLInputElement;
const newMovieDuration = document.querySelector('#new_movie_duration') as HTMLInputElement;
const newMovieGenre = document.querySelector('#new_movie_genre') as HTMLInputElement;
const newMovieRating = document.querySelector('#new_movie_rating') as HTMLInputElement;

const displayMovies = (moviesList: [string, string, string, string, string[], string][]) => {
  moviesContainer.innerHTML = '';

  moviesList.forEach((movie) => {
    moviesContainer.innerHTML += `<div class="movie">
    <h3>${movie[0]}</h3>
    <p>${movie[1]}</p>
    <p><strong>${movie[2]}</strong></p>
    <p>${movie[3]}</p>
    <p>${movie[4].map((genre) => `<p>${genre}</p>`).join("")}</p>
    <p>${movie[5]}</p>
    </div>`
  })
}
displayMovies(movies);

yearUp.addEventListener('click', () => {
  const sortedMovies = [...movies].sort((a, b) => parseInt(a[1]) - parseInt(b[1]));
  
  displayMovies(sortedMovies);
});

yearDown.addEventListener('click', () => {
  const sortedMovies = [...movies].sort((a, b) => parseInt(b[1]) - parseInt(a[1]));
  
  displayMovies(sortedMovies);
});

bestRate.addEventListener('click', () => {
  const sortedMovies = [...movies].sort((a, b) => parseFloat(b[5]) - parseFloat(a[5]));
  
  displayMovies(sortedMovies);
});

searchBtn.addEventListener('click', () => {
  const moviesInputValue = moviesInput.value.toLowerCase();
  
  const moviesFilter = movies.filter((movieValue) => {
    return (
      movieValue[0].toLowerCase().includes(moviesInputValue) ||
      movieValue[1].includes(moviesInputValue) ||
      movieValue[2].toLowerCase().includes(moviesInputValue)
    );
  });

    if (moviesFilter.length > 0) {
      noResultsMessage.style.display = 'none';
    } else {
      noResultsMessage.style.display = 'block';
    }
  displayMovies(moviesFilter);
});

genreFilter.addEventListener('change', () => {
  const selectedGenre = genreFilter.value;
  if (selectedGenre) {
    const filteredMovies = movies.filter((movie) => movie[4].includes(selectedGenre));
    displayMovies(filteredMovies);
  } else {
    displayMovies(movies);
  }
});

addMovieBtn.addEventListener('click', () => {
  const newMovie = [
    newMovieTitle.value,
    newMovieYear.value,
    newMovieDirector.value,
    newMovieDuration.value,
    newMovieGenre.value.split(',').map(genre => genre.trim()),
    newMovieRating.value
  ];

  movies.push(newMovie as [string, string, string, string, string[], string]);
  displayMovies(movies);

  newMovieTitle.value = '';
  newMovieYear.value = '';
  newMovieDirector.value = '';
  newMovieDuration.value = '';
  newMovieGenre.value = '';
  newMovieRating.value = '';
});