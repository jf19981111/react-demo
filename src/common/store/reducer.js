// common 整体上的仓库 reducer
const defaultState = {
    menus: [
        { id: 1, name: '商品店铺', icon: 'schedule' },
        { id: 2, name: '详情信息', icon: 'ordered-list' },
        { id: 3, name: '个人中心', icon: 'user' },
    ]
}

export default (state = defaultState, action) => {
    let newState = JSON.parse(JSON.stringify(state));

    switch (action.type) {
        default:
            break;
    }
    return newState;
}
