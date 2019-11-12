// eslint-disable-next-line @typescript-eslint/no-var-requires
const Mock = require('mockjs');
const votelist = Mock.mock({
    'data|30': [{
        'id|+1': 0,
        'title': '@cword(10)',
        'creator': '@cname()',
        'options|5': [
            {
                'name': '@cword(5)',
                'id|+1': 10
            }
        ],
        'selectCount|1': [1, 2, 3, 4, 5],
        'chartType|1': [0, 1, 2, 3],
        'chartData': [
            { item: '选项1', count: 40 },
            { item: '选项2', count: 21 },
            { item: '选项3', count: 17 },
            { item: '选项4', count: 13 },
            { item: '选项5', count: 9 }
       ],
        'hasAttend|1': [0, 1],
        'startTime|1': ['2019-08-28 10:00:00', '2019-09-18 10:00:00'],
        'endTime|1': ['2019-09-01 10:00:00', '2019-09-20 20:00:00']
    }]
});

module.exports = votelist.data;
