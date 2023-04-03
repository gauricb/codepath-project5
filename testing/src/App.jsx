import { useRoutes } from "react-router-dom";
import NewApp from "./NewApp";
import DetailView from "../routes/DetailView";

function App() {
  let element = useRoutes([
    {
      path: "/",
      element: <NewApp />,
    },
    {
      path: "/CharacterDetails/:id",
      element: <DetailView />,
    },
  ]);

  return <div>{element}</div>;
}

export default App;
