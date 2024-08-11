document.addEventListener("DOMContentLoaded", function(event){
	if(document.querySelector(".rendering_container")){
  
	  const renderingContainers = document.querySelectorAll(".rendering_container");
  
	  const fetchVehicles = async () => {
		try {
		  const response = await fetch("https://swapi.dev/api/vehicles/");
		  const result = await response.json();
		  return result.results; // Return the array of vehicles
		} catch (error) { 
			const errorMessageContainer = document.createElement("div");
			errorMessageContainer.classList.add("error-message");
			errorMessageContainer.textContent = "An error occurred, please try reloading the page";
			document.body.appendChild(errorMessageContainer);
		}
	  };
  
	  async function renderVehicles() {
		const vehicles = await fetchVehicles(); // Call fetchVehicles to get the vehicle data
		vehicles.splice(0,7).forEach((vehicle, index) => {
		  try {
			if (vehicle.name === "TIE/LN starfighter") { //Skip rendering for TIE/LN starfighter
				return;
			  }
			// Create elements
			const vehicleContainer = document.createElement("article");
			vehicleContainer.className = "vehicle";
			const infoContainer = document.createElement("ul");
			infoContainer.className = "vehicle-list";
			const posterContainer = document.createElement("img");
  
			// Append data to created elements
			vehicleContainer.append(infoContainer, posterContainer);
			vehicleContainer.append(posterContainer);
  
			// Append vehicle container to the appropriate rendering container
			renderingContainers[index % renderingContainers.length].appendChild(
			  vehicleContainer
			);
  
			// Render elements with data fetched from API
			infoContainer.innerHTML = `<li>Name: ${vehicle.name}</li><li>Model: ${vehicle.model}</li><li>Class: ${vehicle.vehicle_class}</li><li>Crew: ${vehicle.crew} people</li><li>Manufactured by: ${vehicle.manufacturer}</li>`;
			const imageName = vehicle.name.split(" ").join("-");
			posterContainer.src = `../assets/vehicles/${imageName}.jpg`;
			posterContainer.alt = "Vehicle image";
		  } catch (error) {
			const errorMessageContainer = document.createElement("div");
			errorMessageContainer.classList.add("error-message");
			errorMessageContainer.textContent = "An error occurred, please try reloading the page";
			document.body.appendChild(errorMessageContainer);
		  }
		});
	  }
  
	  renderVehicles();
  
	}
  });
  