const Mock = require('mockjs');
const address = Mock.mock({
    'data|4': [{
        'id|+1': 0,
        'name': '@region'
    }]
});

module.exports = JSON.stringify(address.data);
