import styles from './components.module.css'
import {KeyOutlined} from "@ant-design/icons";

function KeyElement(props) {
    const keyStatusStyle = {
        background: (props.status === 1 || props.status === 2) ? "#D9D9D9"
            : "linear-gradient(90deg, #7474BF 0%, #348AC7 100%)",
    };

    return (
        <div className={styles.key} id={props.id}>
            <KeyOutlined style={{fontSize: 25, paddingLeft: 20}}/>
            <div style={{paddingLeft: 10}}>
                <span className={styles.keyText}>
                    {props.name}
                </span>
            </div>
            <div className={styles.keyStatus} style={keyStatusStyle}>
                {props.status === 0 && (
                    "В наличии"
                )}
                {props.status === 1 && (
                    "Забронирован"
                )}
                {props.status === 2 && (
                    "Отсутствует"
                )}
            </div>
        </div>
    )
}

export default KeyElement;