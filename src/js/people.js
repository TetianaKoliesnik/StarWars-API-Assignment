document.addEventListener("DOMContentLoaded", function (event) {
  if (document.querySelector(".rendering_container")) {
    const renderingContainers = document.querySelectorAll(
      ".rendering_container"
    );

    // Fetch data from the API
    const fetchData = async (url) => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        console.log(result);
        return result.results; // Return the array of data
      } catch (error) {
        const errorMessageContainer = document.createElement("div");
        errorMessageContainer.classList.add("error-message");
        errorMessageContainer.textContent = "An error occurred, please try reloading the page";
        document.body.appendChild(errorMessageContainer);
      }
    };

    // Render the people data
    async function renderPeople() {
      const people = await fetchData("https://swapi.dev/api/people/");
      const movies = await fetchData("https://swapi.dev/api/films/");
      const planets = await fetchData("https://swapi.dev/api/planets/");

      //logic to convert movie url to title and homeworld url to planetname
      const movieUrlToTitleMap = movies.reduce((acc, movie) => {
        acc[movie.url] = movie.title;
        return acc;
      }, {});
      const planetUrlToNameMap = planets.reduce((acc, planet) => {
        acc[planet.url] = planet.name;
        return acc;
      }, {});

      people.slice(0, 6).forEach((person, index) => {
        //limit the number of people to 6
        try {
          //map the movie and homeworld urls to titles
          const movieTitles = person.films.map(
            (url) => movieUrlToTitleMap[url] || ""
          );
          const planetName = planetUrlToNameMap[person.homeworld] || "Unknown";

          //create elements to display the data
          const peopleContainer = document.createElement("article");
          peopleContainer.className = "people";
          const infoContainer = document.createElement("ul");
          infoContainer.className = "people-list";
          const portraitContainer = document.createElement("img");

          // Append data to created elements
          peopleContainer.append(infoContainer, portraitContainer);

          // Append movie container to the appropriate rendering container
          renderingContainers[index % renderingContainers.length].appendChild(
            peopleContainer
          );

          infoContainer.innerHTML = `
		  <li>Name: ${person.name}</li>
		  <li>Birth Year: ${person.birth_year}</li>
		  <li>Height: ${person.height + " cm"}</li>
		  <li>Appears in: ${movieTitles
        .map((title) => `<p>${title}</p>`)
        .join("")}</li> 
		  <li>Homeworld: ${planetName}</li>`;
          const imageName = person.name.split(" ").join("-");
          portraitContainer.src = `../assets/people/${imageName}.jpg`;
          portraitContainer.alt = "Portrait of a Star Wars character";
        } catch (error) {
          const errorMessageContainer = document.createElement("div");
          errorMessageContainer.classList.add("error-message");
          errorMessageContainer.textContent = "An error occurred, please try reloading the page";
          document.body.appendChild(errorMessageContainer);
        }
      });
      const peopleLists = document.querySelectorAll(".people-list");

      //add margin bottom to even out the content
      peopleLists.forEach((list) => {
        const listHeight = list.scrollHeight;
        if (listHeight < 180) {
          list.style.marginBottom = "66px";
        } else if (listHeight < 210) {
          list.style.marginBottom = "43px";
        }
      });
    }
    renderPeople();
  }
});
