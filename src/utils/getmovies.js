export const getMovies = async () => {
  const url = 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=a'
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
