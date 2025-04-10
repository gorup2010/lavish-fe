
import { AppRouter } from "./router";

export default function App() {
  window.addEventListener("load", (e) => {
    if (window.location.hash == "#_=_") {
      window.location.hash = ""; // for older browsers, leaves a # behind
      history.pushState("", document.title, window.location.pathname); // nice and clean
      e.preventDefault(); // no page reload
    }
  });
  return (
    <AppRouter />
  );
}