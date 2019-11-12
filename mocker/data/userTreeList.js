const Mock = require('mockjs');
const userlist = Mock.mock({
    'data|30': [{
        'value|+1': 0,
        'title': '@cword(5)',
        'children|3': [
            {
                'value|+1': 100,
                'title': '@cword(5)',
                'children|3': [
                    {
                        'value|+1': 1000,
                        'title': '@cname()',
                    }
                ]
            }
        ]
    }]
});

module.exports = userlist.data;
