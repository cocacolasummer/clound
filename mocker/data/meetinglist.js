const Mock = require('mockjs');
const meeting = Mock.mock({
    'data|30': [{
        'id|+1': 0,
        'subject': '@cword(10)',
        'startUser': '@cname()',
        'address': '@cword(10)',
        'time': '@date("yyyy-MM-dd HH:mm:ss")-23:55:00',
        'status|1': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        'kind|1': [1, 2, 3],
        'hasSeat|1': [0, 1],
        'attender|15': [{
            'name': '@cname()',
            'avatar|1': ['@image("50x50", "#50B347", "#FFF", "M")', '']
        }]
    }]
});

module.exports = meeting.data;
