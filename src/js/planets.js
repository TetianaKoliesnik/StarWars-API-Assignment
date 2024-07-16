document.addEventListener("DOMContentLoaded", function(event){
	if(document.querySelector(".rendering_container")){
  
	  const renderingContainers = document.querySelectorAll(".rendering_container");
  
	  const fetchPlanets = async () => {
		try {
		  const response = await fetch("https://swapi.dev/api/planets/");
		  const result = await response.json();
		  console.log(result);
		  return result.results; // Return the array of planets
		} catch (error) { 
		  console.log(("An error occurred: " + error.message)); 
		}
	  };
  
	  async function renderPlanets() {
		const planets = await fetchPlanets(); // Call fetchPlanets to get the planet data
		// Filter out planets with unknown population
		const filteredPlanets = planets.filter(planet => planet.population.toLowerCase() !== "unknown");
		filteredPlanets.slice(0,6).forEach((planet, index) => {
		  try {
			// Create elements
			const planetContainer = document.createElement("article");
			planetContainer.className = "planet";
			const infoContainer = document.createElement("ul");
			infoContainer.className = "planet-list";
			const posterContainer = document.createElement("img");
  
			// Append data to created elements
			planetContainer.append(infoContainer, posterContainer);
			planetContainer.append(posterContainer);
  
			// Append planet container to the appropriate rendering container
			renderingContainers[index % renderingContainers.length].appendChild(
			  planetContainer
			);
  
			// Render elements with data fetched from API
			infoContainer.innerHTML = `<li>Name: ${planet.name}</li><li>Gravity: ${planet.gravity}</li><li>Population: ${planet.population} sentient beings</li><li>Climate: ${planet.climate}</li><li>Covered by water: ${planet.surface_water}% </li>`;
			const imageName = planet.title.split(" ").join("-");
			posterContainer.src = `../assets/${imageName}.jpg`;
			posterContainer.alt = "Planet image";
		  } catch (error) {
			console.log(("An error occurred: " + error.message)); 
		  }
		});
	  }
  
	  renderPlanets();
  
	}
  });
  