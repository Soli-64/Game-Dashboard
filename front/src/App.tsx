import { Routes, Route } from "react-router-dom";
import StaticLayout from "./pages/StaticLayout";
import NoMatchPage from "./pages/NoMatch";
import ProfilPage from "./pages/Profil";
import HomePage from "./pages/Home";
import ProjectsPage from "./pages/MyProjects";
import ProjectDashPage from "./pages/ProjectBoardPage";


function App() {

  return (
    <>

      <Routes>

        <Route path="/" element={<StaticLayout />}>

          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/profil" element={<ProfilPage />} />
          <Route path="/projects/:projectname" element={<ProjectDashPage />} />

        </Route>

        <Route path="/*" element={<NoMatchPage />} />

      </Routes>

    </>
  )
}

export default App
