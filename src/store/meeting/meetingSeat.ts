export interface MeetingSeatState {
    show: boolean;
    mount: boolean;
}

export type MeetingSeatAction =
    | {
    type: 'change meetingseat show';
    show: boolean;
    mount: boolean;
} | {
    type: 'change meetingseat unmount';
    mount: boolean;
} | {
    type: 'change meetingseat hide';
    show: boolean;
};
