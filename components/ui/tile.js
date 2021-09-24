import {
  subtleBoxShadow,
  lightBlueBackground,
  greenBoxShadow,
  redBoxShadow
} from '../../styles/Styles';

export const Tile = styled.div`
  ${subtleBoxShadow}
  ${lightBlueBackground}
    padding: 10px;
`;

export const SelectableTile = styled(Tile)`
  &:hover {
    cursor: pointer;
    ${greenBoxShadow}
  }
`;

export const DeletableTile = styled(SelectableTile)`
  &:hover {
    cursor: pointer;
    ${redBoxShadow}
  }
`;

export const DisabledTile = styled(Tile)`
  pointer-events: none;
  opacity: 0.4;
`;

export const SelectedTile = styled(Tile)`
  ${greenBoxShadow}
`;
