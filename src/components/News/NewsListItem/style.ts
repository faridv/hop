import styled from 'styled-components';

export const NewsItemStyled = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 0 33.33333%;
    max-width: 33.33333%;
    padding: .5rem .5rem;

    .desc {
        font-size: .8rem;
        margin-top: .5rem;
        height: 100px;
        max-height: 100px;
        overflow: hidden;

        h3 {
            font-size: 1rem;
            margin-bottom: .5rem;

            .title {
                font-size: 1.1rem;
                font-weight: bold;
            }

            .badge {
                margin-left: .5rem;
                font-size: .8rem;

                i {
                    margin-right: .2rem;
                }
            }
        }

        .summary {
            max-height: 58px;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
`;

export const NewsItemInnerStyled = styled.div`
    outline: ${({ focused }) => (focused ? '6px solid #fff' : '0 none')};
    box-sizing: border-box;
`;
