import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { HomePage } from "@/views/home";
import { DashboardLayout } from "./layout";
import { Providers } from "./providers";

export function App() {
  return (
    <BrowserRouter>
      <Providers>
        <Routes>
          <Route
            path="/"
            element={<DashboardLayout />}
          >
            <Route
              index
              element={<HomePage />}
            />
            <Route
              path="home"
              element={<HomePage />}
            />
            <Route
              path="*"
              element={
                <Navigate
                  to="/"
                  replace
                />
              }
            />
          </Route>
        </Routes>
      </Providers>
    </BrowserRouter>
  );
}
