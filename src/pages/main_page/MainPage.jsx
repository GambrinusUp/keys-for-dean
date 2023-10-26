import styles from './main_page.module.css'
import KeyElement from "../../components/KeyElement";
import {testKeys} from "../../constants/constants";

function MainPage() {

    return (
        <>
            <div className={styles.mainContainer}>
                <div className={styles.panel}>
                    <div className={styles.keysWrapper}>
                        {testKeys.map(keyItem =>
                            <KeyElement key={keyItem.id} id={keyItem.id}
                                        name={keyItem.name} status={keyItem.status}/>)}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainPage;