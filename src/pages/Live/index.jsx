import React from 'react';
import Developing from '~/components/Developing';
import LiveStream from '~/components/LiveStream';
import AgoraRTC from "agora-rtc-sdk-ng";
import { AgoraRTCProvider } from 'agora-rtc-react';

const Live = () => {

    return (
        <div>
            <Developing />
            {/* <AgoraRTCProvider client={AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' })}>
                <LiveStream />
            </AgoraRTCProvider> */}
        </div>
    );
};

export default Live;
