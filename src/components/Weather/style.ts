import styled from 'styled-components';

export const WeatherDataStyled = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 340px;
`;

export const WeatherWeatherStyled = styled.div`
    display: flex;
    border-bottom: 1px solid rgba(255, 255, 255, .3);
    padding-bottom: 1rem;
    margin-bottom: 1rem;

    .ltr { direction: ltr; }

    .preview {
        flex: 1 0 50%;
        max-width: 50%;
        display: flex;
        align-items: center;

        > div {
            flex: 1 0 50%;
            max-width: 50%;
        }

        .weather-icon {
            text-align: center;
            font-size: 1rem;

            i {
                font-size: 7rem;
            }
        }

        .temperature {
            font-size: 5rem;
            text-align: center;
        }
    }

    .details {
        flex: 1 0 50%;
        max-width: 50%;
        display: flex;

        align-items: center;

        ul {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-between;
            width: 100%;

            li {
                text-align: center;
                flex: 1 0 25%;
                max-width: 25%;
                font-size: 1.25rem;
            }
        }
    }
`;

export const WeatherForecastStyled = styled.div`
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 100%;
        li {
            text-align: center;
            flex: 1 0 20%;
            max-width: 20%;
            font-size: .9rem;
            .forecast-header {
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                font-size: 1.5rem;
                i {
                    font-size: 2rem;
                }
                
            }
        }
    }
`;
