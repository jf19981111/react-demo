//  这是右边的头部组件
import React from 'react';

// 引入 antd 的一些组件需要
import { Layout } from 'antd'

class Header extends React.Component {
    render() {
        return (
            <Layout.Header style={{ background: '#fff', paddingLeft: 20, marginBottom: 20 }}>
                <h1 style={{color: 'pink'}}><span>加菲猫</span>&nbsp;&nbsp;&nbsp;--后台管理系统</h1>
            </Layout.Header>
        )
    }

}

export default Header;
