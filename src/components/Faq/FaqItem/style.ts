import styled from "styled-components";

export const FaqItemStyled = styled.div`
  border: 1px solid #ccc;
  margin-bottom: 1rem;
  padding: 0.5rem;
  transition: all 0.3s;
  color: #eee;

  .desc {
    font-size: 0.85rem;
    height: 0;
    overflow: hidden;
    transition: all 0.3s;
  }

  &.active {
    outline: 2px solid #f1c40f;
    .desc {
      height: auto;
      padding-top: 0.5rem;
    }
  }
`;
