import Nav from "./component/header/Nav";
import Footer from "./component/footer/footer";
import Container from "./component/content/Container";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import "./test.scss";

function App() {
  return (
    <div className="App md:overflow-hidden">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Nav />
      <Container />
      <Footer />
    </div>
  );
}

export default App;
