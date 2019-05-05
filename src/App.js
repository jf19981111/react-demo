import React from 'react'

// 引入组件
import Sider from './common/sider/Sider'
import Header from './common/header/Header'

import { Layout } from 'antd';


class App extends React.Component {
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider />
        <Layout>
          <Header />
        </Layout>
      </Layout>
    );
  }
}

export default App;
