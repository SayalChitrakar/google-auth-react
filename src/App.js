import "./App.css";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

function App() {
  async function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token" + response.credential);
    console.log(jwt_decode(response.credential));

    const a = await axios
      .post("http://localhost:4200/seller/login-google", {
        token: response.credential,
      })
      .then((data) => {
        console.log(data);
      });
    console.log(`this is the data ${a.data}`);
  }
  useEffect(() => {
    /* global google*/
    google.accounts.id.initialize({
      client_id:
        "879627649201-k5lm13it0koe5giks81jf116fl3e7bo6.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);
  return (
    <div className="App">
      <div id="signInDiv"></div>
    </div>
  );
}

export default App;
