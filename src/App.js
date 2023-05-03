import Nav from "./component/header/Nav";
import Footer from "./component/footer/footer";
import Container from "./component/content/Container";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

// phần xử lí khi người dùng sử dụng chế độ debug
// if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined") {
//   console.log("Chế độ debug đang được bật!");
// }

function App() {
  return (
    <div className="App ">
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
