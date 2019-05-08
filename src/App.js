import React from 'react'

// 引入组件
import Sider from './common/sider/Sider'
import Header from './common/header/Header'

// 引入路由
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

// 引入路由页面组件
import Shop from './pages/shop/Shop'
import Detail from './pages/detail/Detail'
import Center from './pages/center/center'

import { Layout } from 'antd';

// 引入仓库
import store from './store/index'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      menus: store.getState().common.menus,
    }
  }

  render() {
    return (
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider />
          <Layout>
            <Header />
            <Layout.Content style={{ margin: '0 16px' }}>
              <Route 
                path='/shop' 
                render={() =>   '商家店铺' }
              >
              </Route>
              <Route 
                path='/detail/:id' 
                render={() =>  '详情信息' }
              >
              </Route>
              <Route 
                path='/center' 
                render={() =>  '个人中心' }
              >
              </Route>
              {/* 右侧内容 */}
              <div style={{ padding: 24, marginTop: 20, background: '#fff', minHeight: 360 }}>
                <Switch>
                  {/* 1. 商家店铺 */}
                  <Route path="/shop" component={ Shop }></Route> 
                  {/* 2. 详情页 */}
                  <Route path="/detail/:id" component={ Detail }></Route> 
                  {/* 3. 个人中心 */}
                  <Route path="/center" component={ Center }></Route>
                  {/* 重定向 */}
                  <Redirect from="/" to="/shop"></Redirect>
                </Switch>
              </div> 
            </Layout.Content>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;
