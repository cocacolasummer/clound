// eslint-disable-next-line @typescript-eslint/no-var-requires
const Mock = require('mockjs');
const passRecord = Mock.mock({
  'data|5': [{
    'addressName': '@word(6)',
    'roomList|3': [{
      'id|+1': 1,
      'name': '@word(3)',
      'charData|7': [{
        'day': '@name()',
        'count|1-1000': 100
      }]
    }]
  }]
});

const dataList = passRecord.data;

function getPassRecordList() {
  return (req, res) => {
    const search = req.query.search || undefined;

    return res.json({
      data: dataList,
    });
  };
}

module.exports = {
  getPassRecordList
};
