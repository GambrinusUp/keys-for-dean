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
              <Header style={{background: "linear-gradient(90deg, #0052D4 0%, #4364F7 50%, #6FB1FC 100%)"}}>
                  <span style={{color: 'white', borderBottom: '5px solid',
                      lineHeight: '90px', fontSize: 24, marginLeft: 350}}>Список ключей</span>
              </Header>
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
