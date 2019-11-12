const Mock = require('mockjs');
const typeList = Mock.mock({
  'data|20': [
    {
      'id|+1': 1,
      'name': '@word()'
    }
  ]
});
const goodsList = Mock.mock({
  'data|100': [
    {
      'id|+1': 1,
      'name': '@word()',
      'type|1': typeList.data.map(item => item.id),
      'price|10-50': 50,
      'imgUrl': '@image(\'80x80\')'
    }
  ]
});

const dataTypeList = typeList.data;
const dataGoodsList = goodsList.data;

function getGoodsType() {
  return (req, res) => {
    return res.json(dataTypeList);
  };
}

function getGoodsList() {
  return (req, res) => {
    const type = req.query.type || '0';
    let data;
    if(type) {
      data = dataGoodsList.filter(item => item.type == type);
    }
    return res.json(data);
  };
}

module.exports = {
  getGoodsType,
  getGoodsList
};
