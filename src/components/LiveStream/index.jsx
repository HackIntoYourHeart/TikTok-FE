// src/Livestream.js
import React, { useRef, useEffect } from 'react';
import { useRTCClient, useLocalCameraTrack, useLocalMicrophoneTrack, useJoin, usePublish } from 'agora-rtc-react';
import agoraConfig from '~/config/agora.config';

const LiveStream = () => {
    const client = useRTCClient();
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);

    const { ready: videoReady, localTrack: localCameraTrack } = useLocalCameraTrack();
    const { ready: audioReady, localTrack: localMicrophoneTrack } = useLocalMicrophoneTrack();

    const { isJoined } = useJoin(client, {
        appId: agoraConfig.appId,
        channel: agoraConfig.channel,
        token: agoraConfig.token,
        uid: agoraConfig.uid,
    });

    usePublish(client, videoReady && audioReady ? [localCameraTrack, localMicrophoneTrack] : [], isJoined);

    useEffect(() => {
        if (isJoined && videoReady && audioReady && localCameraTrack && localMicrophoneTrack) {
            localCameraTrack.play(localVideoRef.current);
            localMicrophoneTrack.play();
        }

        client.on('user-published', async (user, mediaType) => {
            await client.subscribe(user, mediaType);
            if (mediaType === 'video' && user.videoTrack) {
                user.videoTrack.play(remoteVideoRef.current);
            }
            if (mediaType === 'audio' && user.audioTrack) {
                user.audioTrack.play();
            }
        });

        client.on('user-unpublished', (user) => {
            if (user.videoTrack) user.videoTrack.stop();
            if (user.audioTrack) user.audioTrack.stop();
        });

        return () => {
            if (client) client.leave();
            if (localCameraTrack) localCameraTrack.stop();
            if (localMicrophoneTrack) localMicrophoneTrack.stop();
        };
    }, [client, isJoined, videoReady, audioReady, localCameraTrack, localMicrophoneTrack]);

    return (
        <div>
            <div>
                <h2>Local Video</h2>
                <div ref={localVideoRef} style={{ width: '400px', height: '300px', backgroundColor: 'black' }}></div>
            </div>
            <div>
                <h2>Remote Video</h2>
                <div ref={remoteVideoRef} style={{ width: '400px', height: '300px', backgroundColor: 'black' }}></div>
            </div>
        </div>
    );
};

export default LiveStream;
