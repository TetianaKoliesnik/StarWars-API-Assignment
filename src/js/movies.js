document.addEventListener("DOMContentLoaded", function(event){
  if(document.querySelector(".rendering_container")){

    const renderingContainers = document.querySelectorAll(".rendering_container");

    const fetchMovies = async () => {
      try {
        const response = await fetch("https://swapi.dev/api/films/");
        const result = await response.json();
        return result.results; // Return the array of movies
      } catch (error) { 
        alert("An error occurred: " + error.message); 
      }
    };

    async function renderMovies() {
      const movies = await fetchMovies(); // Call fetchMovies to get the movie data
      movies.forEach((movie, index) => {
        try {
          // Create elements
          const movieContainer = document.createElement("article");
          movieContainer.className = "movie";
          const infoContainer = document.createElement("ul");
          infoContainer.className = "movie-list";
          const posterContainer = document.createElement("img");
          const movieIntroContainer = document.createElement("p");
          movieIntroContainer.className = "movie-intro";

          // Append data to created elements
          movieContainer.append(infoContainer, posterContainer);
          movieContainer.append(posterContainer);
          movieContainer.append(movieIntroContainer);

          // Append movie container to the appropriate rendering container
          renderingContainers[index % renderingContainers.length].appendChild(
            movieContainer
          );

          // Render elements with data fetched from API
          infoContainer.innerHTML = `<li>Title: ${movie.title}</li><li>Episode: ${movie.episode_id}</li><li>Release date: ${movie.release_date}</li><li>Directed by: ${movie.director}</li>`;
          const imageName = movie.title.split(" ").join("-");
          posterContainer.src = `../assets/${imageName}.jpg`;
          posterContainer.alt = "Movie poster";
          movieIntroContainer.innerText = `${movie.opening_crawl}`
        } catch (error) {
          alert("An error occurred: " + error.message);
        }
      });
    }

    renderMovies();

  }
});
