/*
设备的像素密度，例如：
PixelRatio.get() === 1          mdpi Android 设备 (160 dpi)
PixelRatio.get() === 1.5        hdpi Android 设备 (240 dpi)
PixelRatio.get() === 2          iPhone 4, 4S,iPhone 5, 5c, 5s,iPhone 6,xhdpi Android 设备 (320 dpi)
PixelRatio.get() === 3          iPhone 6 plus , xxhdpi Android 设备 (480 dpi)
PixelRatio.get() === 3.5        Nexus 6       */

import { Dimensions } from 'react-native';


export const deviceWidth = Dimensions.get('window').width; // 设备的宽度
export const deviceHeight = Dimensions.get('window').height;// 设备的高度

const defaultPixel = 2; // iphone6的像素密度
// px转换成dp
const w2 = 375 / defaultPixel;
const h2 = 667 / defaultPixel;
const scale = Math.min(deviceHeight / h2, deviceWidth / w2);// 获取缩放比例

export function px2dp(size) {
    size = Math.round(size * scale + 0.5);
    return size / defaultPixel;
}

export function px2p(size) {
    return size * deviceWidth / 375
}