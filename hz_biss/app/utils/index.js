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

// 时间格式化
export function formatData(time) {

    var d = time ? new Date(time * 1000) : new Date();
    var year = d.getFullYear();
    var month = change(d.getMonth()+1);
    var day = change(d.getDate());
    var hour = change(d.getHours());
    var minute = change(d.getMinutes());
    var second = change(d.getSeconds());

    function change(t){
        if(t<10){
        return "0"+t;
        }else{
        return t;
        }
    }
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}

export {
    px2dp,
    px2p,
    checkPhone,
    chunk
}
