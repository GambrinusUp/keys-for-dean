import {Header} from "antd/es/layout/layout";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

function HeaderItem() {
    const location = useLocation();
    const [activeLink, setActiveLink] = useState('/');

    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location]);

    return (
        <Header style={{background: "linear-gradient(90deg, #0052D4 0%, #4364F7 50%, #6FB1FC 100%)"}}>
                  <span style={{color: 'white', borderBottom: '5px solid',
                      lineHeight: '90px', fontSize: 24, marginLeft: 350}}>
                      {activeLink === '/' ? ("Список ключей") : ("Список заявок")}
                  </span>
        </Header>
    )
}

export default HeaderItem;