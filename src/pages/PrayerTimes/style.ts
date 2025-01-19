import styled from 'styled-components';

export const PrayerTimesStyles = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    padding: 1rem;
    color: white;
    font-size: 1.5rem;
    position: relative;

    .locations {
        max-width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: stretch;
        align-items: center;
        font-size: .9rem;
        padding-left: 200px;
        position: relative;
        z-index: 120;
    }

    .prayers {
        list-style-type: none;
        padding: 0;
        display: flex;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        margin: 0;
        height: 280px;

        li {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            max-width: 16.6666%;
            flex: 1 0 16.6666%;
            overflow: hidden;

            .inner {
                width: 100%;
                border: 1px solid rgba(255, 255, 255, .3);
                margin: 1rem;
                padding: 1rem;
                background: rgba(255, 255, 255, .1);
                text-align: center;
            }

            .title {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                font-size: 1rem;
                margin-bottom: 1rem;

                svg {
                    display: block;
                    width: 3rem;
                    height: 3rem;
                    margin-bottom: 1rem;
                }
            }

            .time {
                font-size: 2rem;
                display: block;
            }
        }
    }

    .map {
        position: absolute; bottom: 0; left: 0;
        width: 320px; height: 320px;
        opacity: 0.5;

        svg {
            display: block; width: 320px; height: 320px;

            .active {
                fill: #f1c40f;
            }
        }
    }
`;
