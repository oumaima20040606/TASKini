import Keycloak from "keycloak-js";

let keycloak: Keycloak;

export function initializeKeycloak() {
  keycloak = new Keycloak({
    url: "http://localhost:8080",
    realm: "taskini-realm",
    clientId: "taskini_client",
  });

  return keycloak
    .init({
      onLoad: "check-sso",
      silentCheckSsoRedirectUri:
        window.location.origin + "/assets/silent-check-sso.html",
    })
    .then((authenticated) => {
      console.log("Authenticated:", authenticated);
    });
}

export function getKeycloak() {
  return keycloak;
}
