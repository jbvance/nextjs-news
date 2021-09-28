import { useContext } from 'react';
import classes from './tile.module.css';
import FavoritesContext from '../../store/favorites-context';

export const Tile = (props) => {
  return <div className={classes.tile}>{props.children}</div>;
};

export const SelectableTile = (props) => {
  return <div className={classes.selectableTile}>{props.children}</div>;
};

export const AddableTile = (props) => {
  const favoritesCtx = useContext(FavoritesContext);
  return (
    <div
      className={classes.selectableTile}
      onClick={() => favoritesCtx.addFavorite(props.item)}
    >
      {props.children}
    </div>
  );
};

export const DeletableTile = (props) => {
  const favoritesCtx = useContext(FavoritesContext);
  return (
    <div
      className={classes.deletableTile}
      onClick={() => favoritesCtx.deleteFavorite(props.id)}
    >
      {props.children}
    </div>
  );
};

export const DisabledTile = (props) => {
  return <div className={classes.disabledTile}>{props.children}</div>;
};

export const SelectedTile = (props) => {
  return <div className={classes.selectedTile}>{props.children}</div>;
};

// export const Tile = styled.div`
//   ${subtleBoxShadow}
//   ${lightBlueBackground}
//     padding: 10px;
// `;

// export const SelectableTile = styled(Tile)`
//   &:hover {
//     cursor: pointer;
//     ${greenBoxShadow}
//   }
// `;

// export const DeletableTile = styled(SelectableTile)`
//   &:hover {
//     cursor: pointer;
//     ${redBoxShadow}
//   }
// `;

// export const DisabledTile = styled(Tile)`
//   pointer-events: none;
//   opacity: 0.4;
// `;

// export const SelectedTile = styled(Tile)`
//   ${greenBoxShadow}
// `;
