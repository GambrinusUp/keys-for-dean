import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";

function MenuItem () {
    const location = useLocation();
    const [activeLink, setActiveLink] = useState('/');

    const handleLinkClick = (path) => {
        setActiveLink(path);
    };

    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location]);

    return (
        <div style={{width: "100%", display:"flex", flexDirection:"column",
            alignItems: "center", justifyContent: "center"}} >
            <Link
                to="/"
                className={activeLink === '/' ? 'btn' : 'non-active-btn'}
                onClick={() => handleLinkClick('/')}
            >
                Список ключей
            </Link>
            <Link
                to="/requests"
                className={activeLink === '/requests' ? 'btn' : 'non-active-btn'}
                onClick={() => handleLinkClick('/requests')}
            >
                Список заявок
            </Link>
        </div>
    )
}

export default MenuItem;