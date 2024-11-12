export const getMovies = async (p, q) => {
  const url = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=${p}&query=${q}`
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMjkzNjAzY2RhYzVhY2Y2OGQyZWY4MTE1ZGRhM2JjYiIsIm5iZiI6MTczMDcxNDg0Mi45NzQyMTQ2LCJzdWIiOiI2NzI4OWJjNzU1NDA4M2E1NmEwZDg1ZDEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M9i0WsImLjNmfqKObgyA_V_Um6ydI8hvKMigy8v12q8',
    },
  }

  return fetch(url, options).then((res) => res.json())
}

export const getGenres = async () => {
  const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en'
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMjkzNjAzY2RhYzVhY2Y2OGQyZWY4MTE1ZGRhM2JjYiIsIm5iZiI6MTczMDcxNDg0Mi45NzQyMTQ2LCJzdWIiOiI2NzI4OWJjNzU1NDA4M2E1NmEwZDg1ZDEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M9i0WsImLjNmfqKObgyA_V_Um6ydI8hvKMigy8v12q8',
    },
  }

  return fetch(url, options).then((res) => res.json())
}

export const createSession = async () => {
  const url = 'https://api.themoviedb.org/3/authentication/guest_session/new'
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMjkzNjAzY2RhYzVhY2Y2OGQyZWY4MTE1ZGRhM2JjYiIsIm5iZiI6MTczMDcxNDg0Mi45NzQyMTQ2LCJzdWIiOiI2NzI4OWJjNzU1NDA4M2E1NmEwZDg1ZDEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M9i0WsImLjNmfqKObgyA_V_Um6ydI8hvKMigy8v12q8',
    },
  }

  return fetch(url, options).then((res) => res.json())
}

export const addRating = async (sessionId, movieId, rating) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${sessionId}`
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMjkzNjAzY2RhYzVhY2Y2OGQyZWY4MTE1ZGRhM2JjYiIsIm5iZiI6MTczMDcxNDg0Mi45NzQyMTQ2LCJzdWIiOiI2NzI4OWJjNzU1NDA4M2E1NmEwZDg1ZDEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M9i0WsImLjNmfqKObgyA_V_Um6ydI8hvKMigy8v12q8',
    },
    body: JSON.stringify({ value: rating }),
  }

  return fetch(url, options).then((res) => res.json())
}


//моя хуйня

export const ratedMovie = async () => {
  const url =
    'https://api.themoviedb.org/3/guest_session/AAAAA/rated/movies?language=en-US&page=1&sort_by=created_at.asc'
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMjkzNjAzY2RhYzVhY2Y2OGQyZWY4MTE1ZGRhM2JjYiIsIm5iZiI6MTczMDcxNDg0Mi45NzQyMTQ2LCJzdWIiOiI2NzI4OWJjNzU1NDA4M2E1NmEwZDg1ZDEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M9i0WsImLjNmfqKObgyA_V_Um6ydI8hvKMigy8v12q8',
    },
  }

  return fetch(url, options).then((res) => res.json())
}
