import React, { useEffect, useState } from 'react';
import './Ranking.scss';
import api from '~/api/api';

const RankingPage = () => {
    const [usersData, setUsersData] = useState();

    const fetData = () => {
        api
            .get('/rankings?sortBy=yesterdayRank:asc')
            .then((response) => {
                const data = response.data;
                setUsersData(data.results);
            })
            .catch((error) => {
                console.error('Lỗi khi gọi API:', error);
            });
    };

    useEffect(() => {
        fetData();
    }, []);
    return (
        <div className="container">
            <main>
                <div id="header">
                    <h1>Ranking</h1>
                    <button class="share">
                        <i class="ph ph-share-network"></i>
                    </button>
                </div>
                <div id="leaderboard">
                    <div class="ribbon"></div>
                    <table>
                        {usersData?.length > 0 &&
                            usersData.map((e, k) => (
                                <tr>
                                    <td class="number">{k + 1}</td>
                                    <td class="name">{e.displayName}</td>
                                    <td class="points">
                                        {e.userPoint}
                                        {k === 0 && (
                                            <img
                                                class="gold-medal"
                                                src="https://cdn-icons-png.flaticon.com/512/2827/2827014.png"
                                                alt="gold medal"
                                            />
                                        )}
                                        {k === 1 && (
                                            <img
                                                class="gold-medal"
                                                src="https://www.transparentpng.com/thumb/silver-medal/silver-medal-png-transparent-image--5.png"
                                                alt="gold medal"
                                            />
                                        )}
                                        {k === 2 && (
                                            <img
                                                class="gold-medal"
                                                src="https://p7.hiclipart.com/preview/379/861/295/gold-medal-silver-medal-icon-medal-medals-bronze-medal.jpg"
                                                alt="gold medal"
                                            />
                                        )}
                                    </td>
                                </tr>
                            ))}
                    </table>
                    <div id="buttons">
                        <button class="exit">Exit</button>
                        <button class="continue">Continue</button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default RankingPage;
