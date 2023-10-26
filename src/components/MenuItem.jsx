import {useState} from "react";
import {Link} from "react-router-dom";

function MenuItem () {
    const [activeLink, setActiveLink] = useState('/'); // Состояние для отслеживания активной ссылки

    // Обработчик клика на ссылке
    const handleLinkClick = (path) => {
        setActiveLink(path); // Устанавливаем активную ссылку при клике
    };

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