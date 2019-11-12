const Mock = require('mockjs');
const meeting = Mock.mock({
    'data': {
        'id|+1': 0,
        'subject': '@cword(10)',
        'address|1': [1, 2, 3, 4, 5],
        'date': ["1977-12-07 23:01:57", "1999-05-24 23:55:00"],
        'status|1': [1, 2, 3, 4],
        'kind|1': [1, 2, 3],
        'fileList': [
            {
                uid: '-1',
                name: 'xxx.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },
            {
                uid: '-2',
                name: 'yyy.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },
        ],
        'chairperson': [1000],
        'attender': [1001, 1002, 1003, 1005],
        'checkperson': '@cname()',
        'circle|2': ['1', '2', '3', '4', '5', '6', '7'],
        'remind|1': ['10', '15', '20'],
        'isRemark|1': ['0', '1'],
        'remarkTime|1': ['10', '15', '20', '30'],
        'description': '@cparagraph()',
        'circleDate': ["1979-01-14", "2018-09-01"],
        'agenda|2': [
            {
                'chairperson': [1000],
                'attender': [1001, 1002, 1003, 1005],
                'time': '09:00:00',
                'content': '@cparagraph()'
            }
        ]
    }
});

module.exports = meeting.data;
