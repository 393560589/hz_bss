import {px2dp, px2p} from "./px2dp";

export { NavigationActions,StackActions } from 'react-navigation'

const phoneExp = /^1\d{10}$/;
function checkPhone(phone) {
    return phoneExp.test(phone);
}

export {
    px2dp,
    px2p,
    checkPhone
}
