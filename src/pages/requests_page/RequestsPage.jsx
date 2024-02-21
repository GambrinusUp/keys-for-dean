import styles from './requests_page.module.css'
import ListItem from "../../components/ListItem";
import {Tabs} from "antd";
import TabPane from "antd/es/tabs/TabPane";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getApprovedRequestsThunkCreator, getRequestsThunkCreator} from "../../store/requestReducer";

function RequestsPage() {
    const dispatch = useDispatch();
    const requests = useSelector((state) => state.requestsReducer.requests);
    const approvedRequests = useSelector((state) => state.requestsReducer.approvedRequests);

    useEffect(() => {
        dispatch(getRequestsThunkCreator()).catch(() => console.log('error'));
        dispatch(getApprovedRequestsThunkCreator()).catch(() => console.log('error'));
    }, []);

    return(
        <>
            <div className={styles.mainContainer}>
                <div className={styles.panel}>
                    <Tabs defaultActiveKey="1" centered style={{width: "100%"}}>
                        <TabPane tab="Активные заявки" key="1">
                            {requests && requests.map((item) => (
                                <ListItem key={item.bidId} id={item.bidId} audienceName={item.audienceName}
                                          date={item.date} time={item.lessonNumber} status={item.bidStatus}/>
                            ))}
                        </TabPane>
                        <TabPane tab="Принятые заявки" key="2">
                            {approvedRequests && approvedRequests.map((item) => (
                                <ListItem key={item.bidId} id={item.bidId} audienceName={item.audienceName}
                                          date={item.date} time={item.lessonNumber} status={item.bidStatus}/>
                            ))}
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </>
    )
}

export default RequestsPage;