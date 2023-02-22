import Nav from "./component/header/Nav";
import Footer from "./component/footer/footer";
import Container from "./component/content/Container";

import "./App.scss";

function App() {
  return (
    <div className="App md:overflow-hidden">
      <Nav />
      <Container />
      <Footer />
    </div>
  );
}

export default App;
