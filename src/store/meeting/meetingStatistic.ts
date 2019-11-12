export interface MeetingStatisticState {
    userCount: any;
    roomTotal: any;
    roomTotalDate: string[];
    roomTotalPage: number;
    roomTotalCount: number;
    attendTotal: any;
    attendTotalDate: string[];
    attendTotalPage: number;
    attendTotalCount: number;
    comRank: any;
    comRankDate: string[];
    comRankPage: number;
    comRankCount: number;
}

export type MeetingStatisticAction =
    | {
    type: 'change meetingStatistic userCount';
    userCount: any;
} | {
    type: 'change meetingStatistic roomTotal';
    roomTotal: any;
    roomTotalCount: number;
} | {
    type: 'change meetingStatistic roomTotalDate';
    roomTotalDate: string[];
} | {
    type: 'change meetingStatistic roomTotalPage';
    roomTotalPage: number;
} | {
    type: 'change meetingStatistic comRank';
    comRank: any;
    comRankCount: number;
} | {
    type: 'change meetingStatistic comRankDate';
    comRankDate: string[];
} | {
    type: 'change meetingStatistic comRankPage';
    comRankPage: number;
} | {
    type: 'change meetingStatistic attendTotal';
    attendTotal: any;
    attendTotalCount: number;
} | {
    type: 'change meetingStatistic attendTotalDate';
    attendTotalDate: string[];
} | {
    type: 'change meetingStatistic attendTotalPage';
    attendTotalPage: number;
}
