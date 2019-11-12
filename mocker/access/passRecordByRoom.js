// eslint-disable-next-line @typescript-eslint/no-var-requires
const Mock = require('mockjs');
const passRecordByRoom = Mock.mock({
  'data|40': [{
    'id|+1': 1,
    'name': '@name()',
    'department': '@word()',
    'passType|1': ['人脸识别', '刷卡', '二维码'],
    'passTime': '@datetime()',
    'imgUrl|1': ['@image(\'200x100\', \'#4A7BF7\', \'Hello\')', '']
  }]
});

const passStatisticByRoom = Mock.mock({
  'data': {
    'title': '@title()',
    'chartData|7': [{
      'day': '@name()',
      'count|1-1000': 100
    }]
  }
});
const dataList = passRecordByRoom.data;

function getPassRecordByRoom() {
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

function getPassStatisticByRoom() {
  return (req, res) => {
    return res.json(passStatisticByRoom.data);
  };
}

module.exports = {
  getPassRecordByRoom,
  getPassStatisticByRoom
};
