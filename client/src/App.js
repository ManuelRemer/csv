import { useFetch } from "./hooks/useFetch";
import "./App.css";
import Fileupload from "./components/Fileupload";
import Input from "./components/Input";

function App() {
  const { data, isPending, error, postData } = useFetch();

  return (
    <div className="App">
      <Fileupload />
      <Input type="file" label="select a file" />
    </div>
  );
}

export default App;
