import styles from "./components.module.css";

function TimeItem(props) {
    return (
        <div className={styles.timeItem} id={props.id} style={{background: props.background}} onClick={props.onClick}>
            <span style={{fontSize: 20}}>
                {props.range}
            </span>
        </div>
    )
}

export default TimeItem;