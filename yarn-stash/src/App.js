import { Routes,Route } from "react-router-dom"
import { ApplicationViews } from "./views/ApplicationViews.js";


import './App.css';

export const App = () => {
  return (
    <Routes>
      <Route path="*"
      element = {<ApplicationViews />} />

    </Routes>
  )
}