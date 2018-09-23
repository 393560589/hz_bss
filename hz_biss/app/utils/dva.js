import React,{PureComponent} from 'react'
import { create } from 'dva-core'
import { Provider,connect } from 'react-redux';
export { connect }
import createLoading from 'dva-loading'

export default (options)=>{
    const app = create(options);
    app.use(createLoading())
    if(!global.registered) options.models.forEach(model=>app.model(model));
    global.registered = true;
    app.start();

    const store = app._store;
    app.start = container =>()=>(
        <Provider store = {store}>
            {container}
        </Provider>
    )
    app.getStore=()=>store;
    return app
}