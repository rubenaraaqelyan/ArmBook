import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GLOBALTYPES } from '../../../store/actions/globalTypes';
import Loading from './Loading';
import Toast from './Toast';

const Notify = () => {
    const dispatch = useDispatch();
    const { alert } = useSelector(state => state);

    const handleShowError = () => {
        dispatch({type: GLOBALTYPES.ALERT_FAIL, payload: {}})
    }

    const handleShowSuccess = () => {
        dispatch({type: GLOBALTYPES.ALERT_SUCCESS  , payload: {}})
    }

    return (
        <div>
            {alert.loading && <Loading />}
            {alert.error && (
                <Toast
                   msg={{title: 'Error', body: alert.error}}
                   handleShow={handleShowError}
                   bgColor="bg-danger"
                />
            )}
            {alert.success && (
                <Toast
                    msg={{title: 'Success', body: alert.success}}
                    handleShow={handleShowSuccess}
                    bgColor="bg-success"
                />
            )}
        </div>
    )
}

export default Notify;
