const Mock = require('mockjs');
const meeting = Mock.mock({
    'data': {
        'week': {
            'userCount': {
                'meetingCount|200-250': 1,
                'remarkCount|100-200': 1,
                'timeCount|100-300': 1
            },
            'roomTotal': [
                { 'item': '1号会议室', 'count|200-400': 1 },
                { 'item': '2号会议室', 'count|200-400': 1 },
                { 'item': '3号会议室', 'count|200-400': 1 },
                { 'item': '4号会议室', 'count|200-400': 1 },
                { 'item': '5号会议室', 'count|200-400': 1 }
            ],
            'attendTotal': [
                { 'label': '周日', 'series1|1500-2000': 1, 'series2|1000-1500': 1 },
                { 'label': '周六', 'series1|1500-2000': 1, 'series2|1000-1500': 1 },
                { 'label': '周五', 'series1|1500-2000': 1, 'series2|1000-1500': 1 },
                { 'label': '周四', 'series1|1500-2000': 1, 'series2|1000-1500': 1 },
                { 'label': '周三', 'series1|1500-2000': 1, 'series2|1000-1500': 1 },
                { 'label': '周二', 'series1|1500-2000': 1, 'series2|1000-1500': 1 },
                { 'label': '周一', 'series1|1500-2000': 1, 'series2|1000-1500': 1 },
            ],
            'comCount': {
                'meetingCount|200-250': 1,
                'userCount|100-200': 1,
                'timeCount|1000-1500': 1,
                'remarkCount|300-500': 1
            },
            'comRank': {
                'user|6': [{
                    'rank|+1': 1,
                    'avatar': '@image("50x50", "#50B347", "#FFF", "M")',
                    'name': '@cname()',
                    'percent|1-100': 1,
                    'time|200-400': 1,
                    'count|50-100': 1
                }],
                'com|6': [{
                    'rank|+1': 1,
                    'name': '@cword(5)',
                    'percent|1-100': 1,
                    'time|200-400': 1,
                    'count|50-100': 1
                }]
            }
        },
        'month': {
            'userCount': {
                'meetingCount|200-250': 1,
                'remarkCount|100-200': 1,
                'timeCount|100-300': 1
            },
            'roomTotal': [
                { 'item': '1号会议室', 'count|200-400': 1 },
                { 'item': '2号会议室', 'count|200-400': 1 },
                { 'item': '3号会议室', 'count|200-400': 1 },
                { 'item': '4号会议室', 'count|200-400': 1 },
                { 'item': '5号会议室', 'count|200-400': 1 }
            ],
            'attendTotal': [
                { 'label': '周日', 'series1|1500-2000': 1, 'series2|1000-1500': 1 },
                { 'label': '周六', 'series1|1500-2000': 1, 'series2|1000-1500': 1 },
                { 'label': '周五', 'series1|1500-2000': 1, 'series2|1000-1500': 1 },
                { 'label': '周四', 'series1|1500-2000': 1, 'series2|1000-1500': 1 },
                { 'label': '周三', 'series1|1500-2000': 1, 'series2|1000-1500': 1 },
                { 'label': '周二', 'series1|1500-2000': 1, 'series2|1000-1500': 1 },
                { 'label': '周一', 'series1|1500-2000': 1, 'series2|1000-1500': 1 },
            ],
            'comCount': {
                'meetingCount|200-250': 1,
                'userCount|100-200': 1,
                'timeCount|1000-1500': 1,
                'remarkCount|300-500': 1
            },
            'comRank': {
                'user|6': [{
                    'rank|+1': 1,
                    'avatar': '@image("50x50", "#50B347", "#FFF", "M")',
                    'name': '@cname()',
                    'percent|1-100': 1,
                    'time|200-400': 1,
                    'count|50-100': 1
                }],
                'com|6': [{
                    'rank|+1': 1,
                    'name': '@cword(5)',
                    'percent|1-100': 1,
                    'time|200-400': 1,
                    'count|50-100': 1
                }]
            }
        },
        'year': {
            'userCount': {
                'meetingCount|2000-2500': 1,
                'remarkCount|1000-2000': 1,
                'timeCount|1000-3000': 1
            },
            'roomTotal': [
                { 'item': '1号会议室', 'count|200-400': 1 },
                { 'item': '2号会议室', 'count|200-400': 1 },
                { 'item': '3号会议室', 'count|200-400': 1 },
                { 'item': '4号会议室', 'count|200-400': 1 },
                { 'item': '5号会议室', 'count|200-400': 1 }
            ],
            'attendTotal': [
                { 'label': '周日', 'series1|1500-2000': 1, 'series2|1000-1500': 1 },
                { 'label': '周六', 'series1|1500-2000': 1, 'series2|1000-1500': 1 },
                { 'label': '周五', 'series1|1500-2000': 1, 'series2|1000-1500': 1 },
                { 'label': '周四', 'series1|1500-2000': 1, 'series2|1000-1500': 1 },
                { 'label': '周三', 'series1|1500-2000': 1, 'series2|1000-1500': 1 },
                { 'label': '周二', 'series1|1500-2000': 1, 'series2|1000-1500': 1 },
                { 'label': '周一', 'series1|1500-2000': 1, 'series2|1000-1500': 1 },
            ],
            'comCount': {
                'meetingCount|2000-2500': 1,
                'userCount|1000-2000': 1,
                'timeCount|10000-15000': 1,
                'remarkCount|3000-5000': 1
            },
            'comRank': {
                'user|6': [{
                    'rank|+1': 1,
                    'avatar': '@image("50x50", "#50B347", "#FFF", "M")',
                    'name': '@cname()',
                    'percent|1-100': 1,
                    'time|200-400': 1,
                    'count|50-100': 1
                }],
                'com|6': [{
                    'rank|+1': 1,
                    'name': '@cword(5)',
                    'percent|1-100': 1,
                    'time|200-400': 1,
                    'count|50-100': 1
                }]
            }
        }
    }
});

module.exports = meeting.data;
