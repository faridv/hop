import styled from 'styled-components';

export const SurahStyled = styled.div`
    padding: 1rem;
    color: #fff;
    height: 100%;
    font-size: 1.5rem;
    font-family: 'Scheherazade', 'Quran', 'Uthmani', serif;

    ::-webkit-scrollbar { display: none; }

    .header {
        height: 185px; overflow: hidden;

        h2 { font-weight: bold; }

        .bismillah {
            margin-top: 20px; font-size: 2.25rem; text-align: center;font-weight: bold; border-bottom: 1px solid #efefef; display: inline-block;
            position: relative; right: 50%; transform: translateX(50%); padding: 20px 40px; margin-bottom: 30px;
        }

    }

    .ayah {
        position: relative;
        margin-bottom: .5rem;
    }

    .body {
        font-size: 2rem;
        text-align: justify;
        padding-right: 80px;
    }
`;

export const AyahContainerStyled = styled.div`
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
`;
