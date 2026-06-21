import { routes as Routes } from "../constants";

export function filterRoutesBySettings(routes, settingsString) {
  if (!settingsString) return Routes;

  const visibility = JSON.parse(settingsString);

  return routes.filter((route) => {
    if (route.hidden === true) return false;

    if (!route.key) return true;

    return visibility[route.key] === false;
  });
}
