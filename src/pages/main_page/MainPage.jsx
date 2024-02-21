import styles from './main_page.module.css'
import KeyElement from "../../components/KeyElement";
import CalendarItem from "../../components/CalendarItem";
import {Input, Pagination, Spin} from "antd";
import {LoadingOutlined, SearchOutlined} from "@ant-design/icons";
import {useState} from "react";
import {useSelector} from "react-redux";

function MainPage() {
    const items = useSelector((state) => state.keysReducer.keys);
    const isLoading = useSelector((state) => state.keysReducer.isLoading);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const [isChecked, setIsChecked] = useState(false);
    const [searchText, setSearchText] = useState('');

    const filteredItems = items.filter(item => {
        if (isChecked && item.keyStatus !== 0) {
            return false;
        }
        if (searchText && !item.audienceName.toLowerCase().includes(searchText.toLowerCase())) {
            return false;
        }
        return true;
    });

    const handleChildCheckboxChange = (newState) => {
        console.log(isChecked);
        console.log(newState);
        setIsChecked(newState);
    };

    const updateCurrentPage = () => {
        setCurrentPage(1);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedKeys = filteredItems.slice(startIndex, endIndex);

    return (
        <>
            <div className={styles.mainContainer}>
                <div className={styles.panel}>
                    <Input size="large" placeholder="Поиск аудитории"
                           style={{borderRadius: 30, height: 50,
                               maxWidth:660, marginTop: 20,
                               boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                               border: '1px solid #000'}}
                           prefix={<SearchOutlined />}
                           value={searchText}
                           onChange={(event) => {
                               setSearchText(event.target.value);
                           }}
                           onPressEnter={updateCurrentPage}
                    />
                    <div className={styles.keysWrapper}>
                        {isLoading ? (
                            <Spin
                                tip="Loading"
                                size="large"
                                indicator={
                                    <LoadingOutlined
                                        style={{
                                            fontSize: 40,
                                        }}
                                        spin
                                    />
                                }
                            />
                        ) : (displayedKeys.length > 0 ? (
                                displayedKeys.map(item => (
                                    <KeyElement key={item.keyId}
                                                id={item.keyId}
                                                name={item.audeinceName}
                                                status={item.keyStatus}
                                    />
                                ))
                            ) : (
                                "Аудиторий не найдено"
                            ))}
                    </div>
                    <Pagination
                        style={{marginTop: 40}}
                        defaultCurrent={1}
                        total={filteredItems.length}
                        pageSize={8}
                        current={currentPage}
                        onChange={setCurrentPage}
                        showSizeChanger={false}
                    />
                </div>
                <CalendarItem onCheckboxChange={handleChildCheckboxChange} />
            </div>
        </>
    )
}

export default MainPage;