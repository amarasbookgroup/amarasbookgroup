import { render } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router";

// Mounts a tree at a chosen URL. Pass `routePath` when the component being
// tested reads `useParams` / `useSearchParams` so the URL pattern matches.
export function renderWithRouter(
  ui,
  { route = "/", routePath = "*" } = {}
) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path={routePath} element={ui} />
      </Routes>
    </MemoryRouter>
  );
}
