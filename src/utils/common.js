
//递归生成 树形结构
const getTreeData = (arr) => {
    var a1 = arr.filter(item => {
        return item.pid === ''
    })
    var fn = (arr2, allarr) => {
        arr2.map(item2 => {
            allarr.map(item3 => {
                if (item3.pid === item2.id) {
                    if (item2.children === undefined) {
                        item2.children = []
                    }
                    item2.children.push(item3)
                }
            })
            if (item2.children && item2.children.length > 0) {
                fn(item2.children, allarr)
            }
        })
    }
    fn(a1, arr)
    return a1
}

export {getTreeData}