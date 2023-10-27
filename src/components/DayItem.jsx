import styles from "./components.module.css";

function DayItem(props) {
    return (
        <div className={styles.dayItem} id={props.id} style={{background: props.background}} onClick={props.onClick}>
            <span style={{fontSize: 15}}>
                {props.date}
            </span>
            <span>
                {props.day}
            </span>
        </div>
    )
}

export default DayItem;