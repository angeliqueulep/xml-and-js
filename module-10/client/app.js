const clientId = ``;
const clientSecret = ``;

const getToken = async () => {
  const result = await fetch(`https://accounts.spotify.com/api/token`, {
    method: `POST`,
    body: `grant_type=client_credentials`,
    headers: {
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      "Content-Type": `application/x-www-form-urlencoded`,
    }
  });

  const data = await result.json();
  return data.access_token;
}

const getGenres = async (token) => {
  const result = await fetch(
    `https://api.spotify.com/v1/browse/categories`,
    {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    }
  );

  const data = await result.json();
  return data.categories.items;
};

const getPlaylistsByGenre = async (token, genreId, limit = 10) => {
  const result = await fetch(
    `https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`,
    {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    }
  );

  const data = await result.json();
  return data.playlists.items;
}

const showPlaylists = (id) => {
  // closes previously selected genres
  const horizontalDisplays = document.querySelectorAll(".horizontal-display");
  horizontalDisplays.forEach((element) => {
    element.classList.remove("horizontal-display");
    element.parentNode.classList.remove("selected");
  });
  const article = document.getElementById(id);
  const playlistCard = article.querySelector('.playlist-card-container');

  article.classList.add("selected");
  playlistCard.classList.toggle('horizontal-display');
};

const load = async () => {
  const token = await getToken();
  const genres = await getGenres(token);

  const list = document.getElementById(`genres`);

  genres.map(async ({name, id, icons: [icon] }) => {
    const playlists = await getPlaylistsByGenre(token, id).then(data =>
      data.map(({ name, images: [image], external_urls: { spotify } }) => `<li>
        <a href="${spotify}" target="_blank">
          <img src="${image.url}" width="180" height="180" alt="${name}"/>
        </a>
      </li>`
      ).join(``)
    );


    const html = `<article class="genre" id="${id}" onclick="showPlaylists('${id}')">
    <div class="genre-card" style="background-image: url(${icon.url})">
      <div>
        <h2>${name}</h2>
      </div>
    </div>

    <div class="playlist-card-container">
      <ol class="playlist-card">
      ${playlists}
      </ol>
    </div>

    </article>`;

    list.insertAdjacentHTML(`beforeend`, html);
  })
}

load();