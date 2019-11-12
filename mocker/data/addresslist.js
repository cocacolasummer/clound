const Mock = require('mockjs');
const meeting = Mock.mock({
    'data|10': [{
        'id|+1': 0,
        'name': '@cword(4)'
    }]
});

module.exports = meeting.data;
