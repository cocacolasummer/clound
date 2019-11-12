import React, {useEffect} from 'react';
import {AccessPassRecord} from '@/component/accessManage/passRecord';
import AccessServices from '@/services/accessServices';
import {IState} from "@/store";
import {useDispatch, useMappedState} from "redux-react-hook";

const _accessServices = new AccessServices();

const mapState = (state: IState): {
    search: string | undefined;
} => {
    return {
        search: state.AccessPassRecord.search,
    };
};

const PassRecordItem: React.ComponentType = () => {
    const dispatch = useDispatch();
    const {search} = useMappedState(mapState);

    useEffect(() => {
        _accessServices.getPassRecord({
            search: search
        }, (data) => {
            dispatch({
                type: 'change accessPassRecord data',
                data: data.data
            });
        }, (err) => {
            console.log(err);
        });
    }, [search, dispatch]);

    return (
        <div>
            <AccessPassRecord/>
        </div>
    );
};

export {
    PassRecordItem
};
