import Storage from 'react-native-storage'
import {AsyncStorage} from 'react-native'
//修改原来的异步储存方式改写成同步储存

let storage = new Storage({
    size:1000,
    storageBackend:AsyncStorage,
    defaultExpires:null,//永不过期
    enableCache:true, // 读写内存自动获得缓存数据
    // 如果storage中没有相应数据，或数据已过期，
    // 则会调用相应的sync方法，无缝返回最新数据。
    // sync方法的具体说明会在后文提到
    // 你可以在构造函数这里就写好sync的方法
    // 或是在任何时候，直接对storage.sync进行赋值修改
    // 或是写到另一个文件里，这里require引入

});

export class StorageUtil{
    static get(key){

        return storage.getItem(key).then((value) => {
                const jsonValue = JSON.parse(value);
                return jsonValue;
           });
    }//读
    static save(key,value){
        return storage.setItem(key,JSON.stringify(value))
    }//存
    static update(key,value){
        return storage.getItem(key).then(item=>{
            value = typeof value === 'string' ? value: Object.assign({},item,value);
            return storage.setItem(key,JSON.stringify(value))
        })
    }//更新
    static delete(key){
        return storage.removeItem(key)
    }  // 删除key 对应json值
    static clear(){
        return storage.clear()
    }//删除所有数据  一般用作清除缓存
}


// 同步储存使用方法案例
/*
async getStorage() {
    let logic = await super.get(logic);
    if (!logic) {
        // 如果是首次登录， 跳转到引导界面
        name = 'Guide';
        component = Guide
    }
}
*/

