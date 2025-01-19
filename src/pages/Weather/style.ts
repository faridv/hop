import styled from 'styled-components';

export const WeatherStyled = styled.div`
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
    
    .weather {
        height: 340px;
    }

`;
