import {px2dp, px2p} from "./px2dp";

export { NavigationActions,StackActions } from 'react-navigation'

const phoneExp = /^1\d{10}$/;
function checkPhone(phone) {
    return phoneExp.test(phone);
}
const chunk=(arr, size) =>{

    let arr2=[];
    for(let i=0;i<arr.length;i=i+size){
        arr2.push(arr.slice(i,i+size));
    }
    return arr2;
}//数组分组
export {
    px2dp,
    px2p,
    checkPhone,
    chunk
}
