document.addEventListener("DOMContentLoaded", function (event) {
  if (document.querySelector(".rendering_container")) {
    const renderingContainers = document.querySelectorAll(
      ".rendering_container"
    );

    //fetch the nessary data from the api
    const fetchPeople = async () => {
      try {
        const response = await fetch("https://swapi.dev/api/people/");
        const result = await response.json();
        console.log(result);
        return result.results; // Return the array of people
      } catch (error) {
        console.log("An error occurred: " + error.message);
      }
    };

    const fetchMovies = async () => {
      try {
        const response = await fetch("https://swapi.dev/api/films/");
        const result = await response.json();
        return result.results; // Return the array of movies
      } catch (error) {
        console.log("An error occurred: " + error.message);
      }
    };

    const fetchPlanets = async () => {
      try {
        const response = await fetch("https://swapi.dev/api/planets/");
        const result = await response.json();
        return result.results; // Return the array of planets
      } catch (error) {
        console.log("An error occurred: " + error.message);
      }
    };

    async function renderPeople() {
      const movies = await fetchMovies();
      const people = await fetchPeople();
      const planets = await fetchPlanets();

      //logic to convert movie url to title and homeworld url to planetname
      const movieUrlToTitleMap = movies.reduce((acc, movie) => {
        acc[movie.url] = movie.title;
        return acc;
      }, {});
      const planetUrlToNameMap = planets.reduce((acc, planet) => {
        acc[planet.url] = planet.name;
        return acc;
      }, {});

      people.forEach((person, index) => {
        try {
          //map the movie and homeworld urls to titles
          const movieTitles = person.films.map(
            (url) => movieUrlToTitleMap[url] || ""
          );
          const planetName = planetUrlToNameMap[person.homeworld] || "Unknown";

          //create elements to display the data
          const peopleContainer = document.createElement("div");
          const infoContainer = document.createElement("ul");
		  const portraitContainer = document.createElement("img");
          infoContainer.className = "people-list";

		  // Append data to created elements
          peopleContainer.append(infoContainer);
		  peopleContainer.append(portraitContainer);
		  
          // Append movie container to the appropriate rendering container
          renderingContainers[index % renderingContainers.length].appendChild(
            peopleContainer
          );

          infoContainer.innerHTML = `
		  <li>Name: ${person.name}</li>
		  <li>Birth Year: ${person.birth_year}</li>
		  <li>Height: ${person.height + " cm"}</li>
		  <li>Appears in: ${movieTitles}</li>
		  <li>Homeworld: ${planetName}</li>`;
        } catch (error) {
          console.log("An error occurred: " + error.message);
        }
      });
    }
    renderPeople();
  }
});
