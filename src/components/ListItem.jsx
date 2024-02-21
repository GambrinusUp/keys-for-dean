import styles from './components.module.css'
import {KeyOutlined} from "@ant-design/icons";
import {Button, Col, message, Popconfirm, Row, Tag} from "antd";
import {colorStatus, textStatus, times} from "../constants/constants";
import {requestAPI} from "../api/requestAPI";
import {useDispatch} from "react-redux";
import {getRequestsThunkCreator} from "../store/requestReducer";

function ListItem(props) {
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch();

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'This is a success message',
        });
    };

    const approve = () => {
        requestAPI.approveRequest(props.id).then(() => {
            dispatch(getRequestsThunkCreator());
            success();
        });
    }

    const deny = () => {
        requestAPI.denyRequest(props.id, "cancel").then(() => {
            dispatch(getRequestsThunkCreator());
            success();
        });
    }

    return (
        <div className={styles.listItem} id={props.id}>
            {contextHolder}
            <Col span={14}>
                <div style={{display: "flex", flexDirection: "row"}}>
                    <KeyOutlined style={{fontSize: 22, paddingLeft: 10}}/>
                    <div className={styles.listItemData}>
                        <span style={{fontSize: 20}}>{props.audienceName}</span>
                        <span
                            style={{fontSize: 16}}>{props.date.split('T')[0]}, {times.find(time => time.id === props.time).range}</span>
                    </div>
                </div>
            </Col>
            <Col span={4}>
                <Tag color={colorStatus[props.status]} style={{fontSize: 20, padding: 5}} bordered={false}>
                    {textStatus[props.status]}
                </Tag>
            </Col>
            <Col span={6}>
                {props.status === 0 ? (
                    <>
                        <Popconfirm
                            title="Принятие заявки"
                            description="Вы хотите принять заявку?"
                            onConfirm={() => approve()}
                            okText="Да"
                            cancelText="Нет"
                        >
                            {/*<CheckCircleOutlined style={{fontSize: 30, color: 'green', paddingLeft: 10}}/>*/}
                            <Button type="primary">
                                Принять
                            </Button>
                        </Popconfirm>
                        <Popconfirm
                            title="Отклонение заявки"
                            description="Вы хотите отклонить заявку?"
                            onConfirm={() => deny()}
                            okText="Да"
                            cancelText="Нет"
                        >
                            {/*<CloseCircleOutlined style={{fontSize: 30, color: 'red',  paddingLeft: 10}}/>*/}
                            <Button type="primary" danger style={{marginLeft: 10}}>
                                Отклонить
                            </Button>
                        </Popconfirm>
                    </>
                ) : (
                    <>
                    </>)
                }
            </Col>
        </div>
    )
}

export default ListItem;