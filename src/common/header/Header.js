//  这是右边的头部组件
import React from 'react';

// 引入 antd 的一些组件需要
import { Layout } from 'antd'

class Header extends React.Component {
    render() {
        return (
            <Layout.Header style={{ background: '#fff', padding: 0 }} />
        )
    }
}

export default Header;
