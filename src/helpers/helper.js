import moment from "moment";
import {findRange} from "../constants/constants";

export function findCurrentRangeIndex(currentTime) {
    const currentMoment = moment(currentTime, 'HH:mm');
    for (let i = 0; i < findRange.length; i++) {
        const [start, end] = findRange[i].split('-').map(range => moment(range, 'HH:mm'));
        if (
            (currentMoment.isSameOrAfter(start) && currentMoment.isSameOrBefore(end))
        ) {
            return i === 0 ? i + 1 : i;
        }
    }
    return 1;
}