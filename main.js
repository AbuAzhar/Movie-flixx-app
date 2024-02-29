let api =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
let searchApi =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const imgPath = "https://image.tmdb.org/t/p/w1280";
// const imgPath ="https://image.tmdb.org/t/p/w500"

let searching = document.getElementById("search");
let formSubmit = document.querySelector(".searching");
let moviesContainer = document.querySelector(".movies");

fetchMovies = async () => {
  try {
    const response = await fetch(api);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    console.log(data);
    let result = data.results;
    console.log(result);
    result.forEach((movies) => {
      const { overview, poster_path, title, vote_average } = movies;

      let cards = document.createElement("div");
      cards.classList = "cards";
      let img = document.createElement("div");
      img.classList = "img";
      let poster = document.createElement("img");

      img.appendChild(poster);
      cards.appendChild(img);

      let rating = document.createElement("div");
      let ratingP = document.createElement("p");
      rating.classList = "rating";
      let star = document.createElement("span");
      star.classList = "material-symbols-outlined";
      ratingP.appendChild(star);
      rating.appendChild(ratingP);
      cards.appendChild(rating);

      let content = document.createElement("div");
      content.classList = "content";
      let titl = document.createElement("h2");
      let ovrview = document.createElement("p");
      content.appendChild(titl);
      content.appendChild(ovrview);
      cards.appendChild(content);

      poster.src = `${imgPath}${poster_path}`;
      poster.alt = `${title}`;

      titl.textContent = `${title}`;
      ovrview.textContent = `${overView(overview)} .....`;
      ratingP.innerHTML = `<span class="material-symbols-outlined">
      star
      </span>
      ${vote_average}`;
      ratingP.classList = `${getRating(vote_average)}`;

      moviesContainer.append(cards);
    });
  } catch (error) {
    console.log(`Fetching Data Error ${error.message}`);
  }
};
fetchMovies();
// console.log(fetchMovies())

function overView(text) {
  const words = text.split(/\s+/);
  const result = words.slice(0, 20).join(" ");

  return result;
}

function getRating(vote) {
  if (vote >= 7) {
    return "green";
  } else if (vote >= 6) {
    return "orange";
  } else if (vote.length == 2) {
    return toFixed(2);
  } else {
    return "red";
  }
}

formSubmit.addEventListener("submit", async (e) => {
    e.preventDefault();
    let search = searching.value;
  
    if (search) {
      try {
        const response = await fetch(searchApi + search);
        const data = await response.json();
  
        // console.log(data)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        let result = data.results;
        moviesContainer.innerHTML = ""; // Clear existing movie cards
  
        result.forEach((movie) => {
          const { overview, poster_path, title, vote_average } = movie;

          let cards = document.createElement("div");
          cards.classList = "cards";
          let img = document.createElement("div");
          img.classList = "img";
          let poster = document.createElement("img");
    
          img.appendChild(poster);
          cards.appendChild(img);
    
          let rating = document.createElement("div");
          let ratingP = document.createElement("p");
          rating.classList = "rating";
          let star = document.createElement("span");
          star.classList = "material-symbols-outlined";
          ratingP.appendChild(star);
          rating.appendChild(ratingP);
          cards.appendChild(rating);
    
          let content = document.createElement("div");
          content.classList = "content";
          let titl = document.createElement("h2");
          let ovrview = document.createElement("p");
          content.appendChild(titl);
          content.appendChild(ovrview);
          cards.appendChild(content);
    
          poster.src = `${imgPath}${poster_path}`;
          poster.alt = `${title}`;
    
          titl.textContent = `${title}`;
          ovrview.textContent = `${overView(overview)} .....`;
          ratingP.innerHTML = `<span class="material-symbols-outlined">
          star
          </span>
          ${vote_average}`;
          ratingP.classList = `${getRating(vote_average)}`;
    
          moviesContainer.append(cards);
        });
      } catch (error) {
        console.log(`Fetching Data Error ${error.message}`);
      }
    }
    else{
        // console.log( ' is not a valid object type');
        alert("Please Enter  Valid Movie Name!");
    }
  });

  