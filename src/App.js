import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import {Layout} from "antd";
import Sider from "antd/es/layout/Sider";
import {Content} from "antd/es/layout/layout";
import MainPage from "./pages/main_page/MainPage";
import MenuItem from "./components/MenuItem";
import RequestsPage from "./pages/requests_page/RequestsPage";
import HeaderItem from "./components/HeaderItem";

function App() {
  return (
      <Router>
          <Layout>
              <HeaderItem />
              <Layout hasSider>
                  <Sider
                      breakpoint="lg"
                      collapsedWidth="200"
                      style={{background: "#D9D9D9"}} width={400}>
                      <MenuItem />
                  </Sider>
                  <Content>
                      <Routes>
                          <Route path='/' element={<MainPage />} />
                          <Route path='/requests' element={<RequestsPage />} />
                      </Routes>
                  </Content>
              </Layout>
          </Layout>
      </Router>
  );
}

export default App;
