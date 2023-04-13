const clientId = ``;
const clientSecret = ``;
let _data = [];

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
};

const getPlaylistTracks = async (token, url) => {
  const limit = 5;

  try {
    const result = await fetch(url + `?limit=${limit}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await result.json();
    return data.items;
  } catch (error) {
    if (error.status === 429) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return await getPlaylistTracks(token, url);
    } else {
      throw error;
    }
  }
};

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

const loadData = async () => {
  const token = await getToken();
  const genres = await getGenres(token);

  _data = await Promise.all(
    genres.map(async (genre) => {
      const playlists = await getPlaylistsByGenre(token, genre.id);
      const tracks = await Promise.all(
        playlists.map(async ({tracks: {href: tracksUrl}}) => {
          return await getPlaylistTracks(token, tracksUrl);
        })
      );

      return { ...genre, playlists, tracks };
    })
  );
};

const renderData = (filterTerm) => {
  let source = _data;

  if (filterTerm) {
    source = source.filter(({ name }) => name.toLowerCase().includes(filterTerm.toLowerCase()));
  }

  const list = document.getElementById(`genres`);

  const html = source.reduce((acc, { name, id, icons: [icon], playlists, tracks }) => {
    if (playlists) {
      // debugger;
      const tracksList = tracks.map(({track: {name, artists: [{name: artistName}]}}) => {
        return `<li>${name} - ${artistName}</li>`;
      }).join(``);

      const playlistsList = playlists.map(
        ({ name, images: [image], external_urls: { spotify } }) => `
          <li>
            <div>
              <a href="${spotify}" target="_blank">
                <img src="${image.url}" width="180" height="180" alt="${name}"/>
              </a>
              <h3>Tracks</h3>
              <ol>
              ${tracksList}
              </ol>
            </div>
          </li>`
      ).join(``);
      return (
        acc +
        `<article class="genre" id="${id}" onclick="showPlaylists('${id}')">
          <div class="genre-card" style="background-image: url(${icon.url})">
            <div>
              <h2>${name}</h2>
            </div>
          </div>

          <div class="playlist-card-container">
            <ol class="playlist-card">
            ${playlistsList}
            </ol>
          </div>

        </article>`
      );
    }
  }, ``);
  list.innerHTML = html;
};

loadData().then(renderData);

const onSubmit = (event) => {
  event.preventDefault();

  const term = event.target.genre.value;

  renderData(term);
};
