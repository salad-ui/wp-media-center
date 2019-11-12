import styled from 'styled-components';
import {m, p} from '@salad-ui/spacing';

export const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  ${m(0)}
  ${p(0)}
  list-style-type: none;
  margin: -8px;
`;
