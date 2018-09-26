import queryString from "query-string";

const API_ROOT = 'https://api.spotify.com/v1/me/';

export const ApiService = {

   userApi: (url, component, stateParam) => {
    // Parse the users access token
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    let auth = { headers: { Authorization: "Bearer " + accessToken } }

    return fetch(API_ROOT + url, auth)
      .then(response => {
        if (!response.ok) {
          console.log("Network request failed")
        }
        return response;
      })
      .then(data => data.json())
      .then(data => {
          // Store response in local state
          component.setState({
            [stateParam]: data.items
          });
        },
        () => {
          component.setState({
            requestFailed: true
          });
        }
      );
  }
}
