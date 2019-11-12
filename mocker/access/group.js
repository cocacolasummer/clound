const Mock = require('mockjs');
const moment = require('moment');

const groupList = Mock.mock({
    'data|30': [{
        'id|+1': 0,
        'name': '@cword(8)',
        'description': '@sentence()',
        'updateTime': '@datetime()',
        'imgUrl': '@image(\'200x100\', \'#4A7BF7\', \'Hello\')',
        'isSnapshot|1': [0, 1]
    }]
});

const dataList = groupList.data;

function getAccessGroupList() {
    return (req, res) => {
        const page = req.query.page || 1;
        const limit = req.query.limit || 8;
        const search = req.query.search || undefined;
        let data = dataList;
        if(search) {
            data = data.filter(item => {
                return item.name.indexOf(search) !== -1;
            });
        }
        const list = data.slice((page - 1) * limit, page * limit);
        return res.json({
            list: list,
            page: page,
            limit: limit,
            total: data.length
        });
    };
}

function getAccessGroupById() {
    return (req, res) => {
        const id = req.query.id.trim();
        let data;
        dataList.forEach(item=>{
           if(item.id == id) {
               data = item;
           }
        });

        return res.json(data);
    };
}

function putAccessGroupById() {
    return (req, res) => {
        const {id, name} = req.body;
       dataList.forEach(item=>{
          if(item.id == id) {
              item.name = name;
              item.updateTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
          }
       });
       return res.json({
           message: '修改成功',
           code: 0
       });
    };
}

module.exports = {
    getAccessGroupList,
    getAccessGroupById,
    putAccessGroupById
};
