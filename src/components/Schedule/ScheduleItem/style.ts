import styled from 'styled-components';

export const ScheduleItemStyled = styled.li<{focused: boolean}>`
    figure {
        float: right;
        width: 160px;
        margin: 0;
        background: #efefef;

        display: none;

        //& + .desc { margin-right: 160px; }

        img {
            display: block;
        }
    }

    .desc {
        //margin-right: 160px;
        padding: 0 .5rem 0 calc(120px + 1rem);
        color: #fff;

        h4 {
            font-size: 13px;
            color: #808080;
        }

        h3 {
            font-size: 1.15rem;
        }

        .time { display: inline-block; float: left; }

        .episode { font-size: 60%; color: #999; }

        p {
            font-size: 0.8rem;
            color: #ddd;
            max-height: 36px; overflow: hidden;

            &.summary { overflow: hidden; max-height: 2.4rem; }

            &.description { display: none; margin-bottom: 0; max-height: 3.6rem; overflow: hidden; }
        }

        time {
            padding-top: 1rem; display: block; width: 120px; height: 80px; position: absolute; left: 1rem; top: 0;
            color: #f1c40f; font-size: 30px; font-weight: bold; text-align: center;
            line-height: 1.25;

            span { color: #ddd; display: block; font-size: 16px; }
        }
    }
`;

export const ScheduleItemInnerStyled = styled.div`
    outline: ${({ focused }) => (focused ? '6px solid #fff' : '0 none')};
    background: ${({ focused }) => focused ? '#666' : 'rgba(255, 255, 255, .1)'};
    box-sizing: border-box;
    height: 100%;
    border: 1px solid #666;
    padding: .5rem;
    min-height: 80px;
    margin-bottom: 1rem;
    position: relative;
`;
