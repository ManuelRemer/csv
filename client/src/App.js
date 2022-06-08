import { useFetch } from "./hooks/useFetch";
import "./App.css";

import Input from "./components/Input";

function App() {
  const { data, isPending, error, postData, postFile } = useFetch(
    "api/v1/collections/people/check"
  );

  const {
    data: data2,
    isPending: isPending2,
    error: error2,
    postData: postData2,
    postFile: postFile2,
  } = useFetch("api/v1/collections/people/csv");

  return (
    <div className="App">
      <Input type="file" label="select a file" handleInput={postFile} />
      {/* {data && (
        <button onClick={() => postData2({ tempFilePath: data.tempFilePath })}>
          Hallo
        </button>
      )} */}
    </div>
  );
}

export default App;
