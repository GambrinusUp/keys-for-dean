import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import {Layout} from "antd";
import Sider from "antd/es/layout/Sider";
import {Content, Header} from "antd/es/layout/layout";
import MainPage from "./pages/main_page/MainPage";
import MenuItem from "./components/MenuItem";

function App() {
  return (
      <Router>
          <Layout>
              <Header style={{background: "linear-gradient(90deg, #0052D4 0%, #4364F7 50%, #6FB1FC 100%)"}}>Header</Header>
              <Layout hasSider>
                  <Sider
                      style={{background: "#D9D9D9"}} width={400}>
                      <MenuItem />
                  </Sider>
                  <Content>
                      <Routes>
                          <Route path='/' element={<MainPage />} />
                      </Routes>
                  </Content>
              </Layout>
          </Layout>
      </Router>
  );
}

export default App;
