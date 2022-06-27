import React from "react";
import { Routes, Route } from 'react-router-dom'
import { publicRoutes } from "./routes";

function App() {
  return (
    <>
      <Routes>
        {
          publicRoutes.map(route => (
            <Route key={route.id} path={route.path} element={route.page} />
          ))
        }
      </Routes>
    </>
  );
}

export default App;
