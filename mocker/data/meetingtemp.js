const Mock = require('mockjs');
const meetingTemp = Mock.mock({
    'data|30': [{
        'id|+1': 0,
        'subject': '@cword(10)',
        'startUser': '@cname()',
        'address': '@cword(10)',
        'time': '@date("yyyy-MM-dd HH:mm:ss")-23:55:00',
        'attender|15': [{
            'name': '@cname()',
            'avatar|1': ['@image("50x50", "#50B347", "#FFF", "M")', '']
        }]
    }]
});

module.exports = meetingTemp.data;
