const Mock = require('mockjs');
const LogisticList = Mock.mock({
  'data|30': [{
    'id|+1': 0,
    'creator': '@name',
    'serveTime|1': ['2019-09-27 12:00-14:00', '2019-09-28 15:00-19:00'],
    'address': '@county(true)',
    'status|1': ['0', '1', '2', '3', '4', '5'],
    'serveContent': '@sentence()',
    'attendant': '@first()',
    'imgUrl': '@image(\'160x160\')'
  }]
});
const dataList = LogisticList.data;
function getLogisticList() {
  return (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const search = req.query.search || undefined;
    let data = dataList;
    if(search) {
      data = data.filter(item => {
        return item.creator.indexOf(search) !== -1;
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

module.exports = {
  getLogisticList
};
