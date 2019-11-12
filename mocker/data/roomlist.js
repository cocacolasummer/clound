const Mock = require('mockjs');
const room = Mock.mock({
    'data|10': [{
        'id|+1': 0,
        'name': '@cword(5)',
        'addressId|0-3': 3,
        'openStartTime': '@time("H:m")',
        'openEndTime': '23:45',
        'appointTime': [
            {
                'startTime': "17:45",
                'endTime': "19:00"
            },
            {
                'startTime': "20:00",
                'endTime': "21:15"
            }
        ]
    }]
});

module.exports = JSON.stringify(room.data);
