import styles from './components.module.css'
import {KeyOutlined} from "@ant-design/icons";

function KeyElement(props) {
    const keyStatusStyle = {
        background: props.status === "Отсутствует" ? "#D9D9D9"
            : "linear-gradient(90deg, #7474BF 0%, #348AC7 100%)",
    };

    return (
        <div className={styles.key} id={props.id}>
            <div>
                <KeyOutlined style={{fontSize: 25, paddingLeft: 20}}/>
                <span className={styles.keyText}>
                    {props.name}
                </span>
            </div>
            <div className={styles.keyStatus} style={keyStatusStyle}>
                {props.status}
            </div>
        </div>
    )
}

export default KeyElement;