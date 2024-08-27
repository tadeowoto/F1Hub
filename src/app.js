(() => {
  fetch("https://api.openf1.org/v1/drivers?session_key=latest")
    .then((response) => response.json())
    .then((data) => {
      let cardsSection = document.querySelector(
        ".loading-content .cards-section"
      );
      data.forEach((driver) => {
        let card = createDriverCard(driver);
        cardsSection.appendChild(card);
      });
    })
    .catch((error) => console.error("Error en el fetch:", error));
})();

function createDriverCard(driver) {
  let card = document.createElement("div");
  card.classList.add("pilot-card");

  let topInfo = document.createElement("div");
  topInfo.classList.add("top-info");

  let imgContainer = document.createElement("div");
  imgContainer.classList.add("pilot-img-container");
  let img = document.createElement("img");
  img.src = driver.headshot_url;
  img.alt = driver.full_name;
  imgContainer.appendChild(img);

  let mainInfo = document.createElement("div");
  mainInfo.classList.add("pilot-main-info");
  let name = document.createElement("p");
  name.textContent = driver.full_name;
  let acronym = document.createElement("p");
  acronym.textContent = driver.name_acronym;
  mainInfo.appendChild(name);
  mainInfo.appendChild(acronym);
  topInfo.appendChild(imgContainer);

  topInfo.appendChild(mainInfo);

  let bottomInfo = document.createElement("div");
  bottomInfo.classList.add("bottom-info");

  let team = document.createElement("p");
  team.textContent = driver.team_name;
  let nationality = document.createElement("p");
  nationality.textContent = driver.country_code;
  bottomInfo.appendChild(team);
  bottomInfo.appendChild(nationality);

  card.appendChild(topInfo);
  card.appendChild(bottomInfo);

  return card;
}

function loadTeams(team) {
  fetch("https://api.openf1.org/v1/drivers?session_key=latest")
    .then((response) => response.json())
    .then((data) => {
    let cardsSection = document.querySelector(".loading-content .cards-section");
      let selectDrives = data.filter(e => e.team_name === team);
      selectDrives.forEach(driver => {
        let card = createDriverCard(driver);
        cardsSection.appendChild(card);
      });
    })
    .catch((error) => console.error("Error en el fetch:", error));
}

function allDrivers(){
    cleanSection();
    fetch("https://api.openf1.org/v1/drivers?session_key=latest")
    .then((response) => response.json())
    .then((data) => {
      let cardsSection = document.querySelector(
        ".loading-content .cards-section"
      );
      data.forEach((driver) => {
        let card = createDriverCard(driver);
        cardsSection.appendChild(card);
      });
    })
    .catch((error) => console.error("Error en el fetch:", error));
}

function cleanSection(){
    let cardsSection = document.querySelector(".loading-content .cards-section");
    cardsSection.innerHTML = '';
}


document.querySelectorAll(".team-btn").forEach((button) => {
  button.addEventListener("click", function () {
    let team = this.getAttribute("data-team");
    cleanSection();
    loadTeams(team);
  });
});
