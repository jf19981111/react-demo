//  这是侧边栏组件
import React from 'react';

// 引入图片
import {Logo} from './style'

// 引入仓库
import store from '../../store'

import { Link } from 'react-router-dom'

// 引入 antd 的一些组件需要
import { Layout, Menu, Icon } from 'antd'

class Sider extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        collapsed: false, // 侧边栏是否滑动
        menus: store.getState().common.menus
      }

      store.subscribe(() => {
        this.setState(() => ({
          menus: store.getState().common.menus
        }))
      })


    }
    render() {
        return (
            <Layout.Sider
              collapsible
              collapsed={this.state.collapsed}
              onCollapse={this.onCollapse}
              >
              <Logo />
              <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                  {
                    this.state.menus.map((item,index) => {
                      return (
                          <Menu.Item key={index + 1}>
                            <Link to={item.href}>
                              <Icon type={item.icon} />
                              <span>{ item.name }</span>
                            </Link>
                          </Menu.Item>
                      )
                    })
                  }
              </Menu>
            </Layout.Sider>
        )
    }

    /**
     * Sider 侧边栏的 滑动
     */
    onCollapse = (collapsed) => {
      console.log(collapsed);
      this.setState({ collapsed });
    }
}

export default Sider;
