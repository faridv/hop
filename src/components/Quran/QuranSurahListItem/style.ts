import styled from 'styled-components';

export const QuranSurahListItemStyled = styled.li`
    list-style-type: none;
    flex: 1 0 25%;
    max-width: 25%;
    padding: .5rem;


    .font-qurani { font-family: 'Scheherazade', 'Quran', 'Uthmani', serif; }

    .desc {
        color: #fff;
        font-size: .9rem;
        margin-top: .5rem;
        height: 70px;
        max-height: 100px;
        overflow: hidden;

        h3 {
            font-size: 1.75rem;

            span { font-weight: normal; font-size: 1rem; color: #888; }
        }

        .meta {
            font-size: 0.85rem; color: #888;
            display: flex; flex-direction: row; flex-wrap: wrap;
        }

        p {
            margin-bottom: 0; line-height: 30px; flex: 0 0 50%; max-width: 50%;

            span { font-weight: bold; }

            & + p { text-align: left; }
        }
    }
`;


export const QuranSurahListItemInnerStyled = styled.div<{ focused: boolean }>`
  width: 100%; height: 100%;
    background: ${({ focused }) => focused ? '#666' : 'rgba(255, 255, 255, .1)'};
    outline: ${({ focused }) => (focused ? '6px solid #fff' : '0 none')};
    box-sizing: border-box;
    border: 1px solid #666;
    padding: .5rem;
    min-height: 60px;
    //margin-bottom: 1rem;
    position: relative;
`;
