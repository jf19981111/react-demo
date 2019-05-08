// 这是商家店铺的 路由页面组件
import React, { Component } from 'react';

import http from '@/utils/http';
import { MainWrap } from './style'

import {
    Table, Input, Button, Popconfirm, Form,Layout
} from 'antd';

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends Component {
    state = {
      editing: false,
    }
  
    toggleEdit = () => {
      const editing = !this.state.editing;
      this.setState({ editing }, () => {
        if (editing) {
          this.input.focus();
        }
      });
    }
  
    save = (e) => {
      const { record, handleSave } = this.props;
      this.form.validateFields((error, values) => {
        if (error && error[e.currentTarget.id]) {
          return;
        }
        this.toggleEdit();
        handleSave({ ...record, ...values });
      });
    }
  
    render() {
      const { editing } = this.state;
      const {
        editable,
        dataIndex,
        title,
        record,
        index,
        handleSave,
        ...restProps
      } = this.props;
      return (
        <td {...restProps}>
          {editable ? (
            <EditableContext.Consumer>
              {(form) => {
                this.form = form;
                return (
                  editing ? (
                    <FormItem style={{ margin: 0 }}>
                      {form.getFieldDecorator(dataIndex, {
                        rules: [{
                          required: true,
                          message: `${title} is required.`,
                        }],
                        initialValue: record[dataIndex],
                      })(
                        <Input
                          ref={node => (this.input = node)}
                          onPressEnter={this.save}
                          onBlur={this.save}
                        />
                      )}
                    </FormItem>
                  ) : (
                    <div
                      className="editable-cell-value-wrap"
                      style={{ paddingRight: 24 }}
                      onClick={this.toggleEdit}
                    >
                      {restProps.children}
                    </div>
                  )
                );
              }}
            </EditableContext.Consumer>
          ) : restProps.children}
        </td>
      );
    }
  }

class EditableTable extends Component {
    constructor(props) {
      super(props);
      this.columns = [
      {
        title: '商家ID',
        dataIndex: 'id',
        editable: true,
      }, {
        title: '商家店铺名',
        dataIndex: 'name',
        width: '30%',
      }, {
        title: '商家图片',
        dataIndex: 'img',
        align: 'center',
        render: (text,record) => {
            return <img src={record.img} alt="" />
        }
      }, {
        title: '操作',
        dataIndex: 'operation',
        align: 'center',
        render: (text, record) => (
          this.state.dataSource.length >= 1
            ? (
              <Popconfirm title="确定取消协议吗?" onConfirm={() => this.handleDelete(record.key)}>
                <a href="javascript:;">删除</a>
              </Popconfirm>
            ) : null
        ),
      }
    ];
  
      this.state = {
        dataSource: [],
        count: 2, 
        pageNum: 1,
        pageSize: 3,
      };
      // 获取店铺列表
      this.getShopList = this.getShopList.bind(this)
    }
  
    handleDelete = (key) => {
      const dataSource = [...this.state.dataSource];
      this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    }
  
    handleSave = (row) => {
      const newData = [...this.state.dataSource];
      const index = newData.findIndex(item => row.key === item.key);
      const item = newData[index];
      newData.splice(index, 1, {
        ...item,
        ...row,
      });
      this.setState({ dataSource: newData });
    }
  
    render() {
      const { dataSource } = this.state;
      const components = {
        body: {
          row: EditableFormRow,
          cell: EditableCell,
        },
      };
      const columns = this.columns.map((col) => {
        if (!col.editable) {
          return col;
        }
        return {
          ...col,
          onCell: record => ({
            record,
            editable: col.editable,
            dataIndex: col.dataIndex,
            title: col.title,
            handleSave: this.handleSave,
          }),
        };
      });
      return (
        <div>
          <Layout.Header style={{ background: '#fff', paddingLeft: 20, marginBottom: 20 }}>
                <Input.Search
                    placeholder="请输入..."
                    onSearch={this.getShopList}
                    style={{ width: 200, marginRight: 20 }}
                />
                <Button type="primary">添加资源</Button>
            </Layout.Header>
          <MainWrap>
            <Table
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource}
                columns={columns}
                pagination={{ total: 11, defaultPageSize: 3 }}
            />
          </MainWrap>
        </div>
      );
    }

    componentDidMount() {
        this.getShopList()
    }

    /**
     * 获取店铺列表
     */
   async getShopList(value = '') {
       console.log(value)
        let { pageNum, pageSize } = this.state;
    await http.get('/json/shop.json', {
            params: {
                name: value,
                pageNum,
                pageSize,
            }
        }).then(res => {
            let result = res.items.filter(item => {
                return item.name.indexOf(value) > -1
            })
                this.setState(() => ({
                    dataSource: result
                }))
            })
    }
  }


export default EditableTable;
