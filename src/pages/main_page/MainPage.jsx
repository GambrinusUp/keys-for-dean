import styles from './main_page.module.css'
import KeyElement from "../../components/KeyElement";
import {testKeys} from "../../constants/constants";
import CalendarItem from "../../components/CalendarItem";
import {Input, Pagination} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";

function MainPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchKey, setSearchKey] = useState('');
    const itemsPerPage = 8;
    const [totalFilteredKeys, setTotalFilteredKeys] = useState(testKeys);
    const [isChecked, setIsChecked] = useState(false);

    const handleChildCheckboxChange = (newState) => {
        console.log(isChecked);
        console.log(newState);
        setIsChecked(newState);
    };


    useEffect(() => {
        console.log('check')
        /*const filteredKeys = testKeys.filter((keyItem) =>
            keyItem.name.toLowerCase().includes(searchKey.toLowerCase())
        );*/
        const filteredKeys = testKeys.filter((keyItem) => {
            return keyItem.name.toLowerCase().includes(searchKey.toLowerCase()) &&
                (!isChecked || keyItem.status !== 'Отсутствует');
        });
        setTotalFilteredKeys(filteredKeys);
    }, [searchKey, isChecked]);

    const updateCurrentPage = () => {
        setCurrentPage(1);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedKeys = totalFilteredKeys.slice(startIndex, endIndex);

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
                           value={searchKey}
                           onChange={(event) => setSearchKey(event.target.value)}
                           onPressEnter={updateCurrentPage}/>
                    <div className={styles.keysWrapper}>
                        {displayedKeys.map(keyItem =>
                            <KeyElement key={keyItem.id} id={keyItem.id}
                                        name={keyItem.name} status={keyItem.status}/>)}
                    </div>
                    <Pagination
                        style={{marginTop: 40}}
                        defaultCurrent={1}
                        total={totalFilteredKeys.length}
                        pageSize={8}
                        current={currentPage}
                        onChange={setCurrentPage}/>
                </div>
                <CalendarItem onCheckboxChange={handleChildCheckboxChange} />
            </div>
        </>
    )
}

export default MainPage;