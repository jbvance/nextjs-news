import { SelectableTile, DisabledTile } from '../ui/tile';
import classes from './sources-grid.module.css';

function SourcesGrid({ sourceList }) {
  return (
    <div className={classes.sourcesGrid}>
      {sourceList.map((source) => {
        return <SelectableTile key={source.id}>{source.name}</SelectableTile>;
      })}
    </div>
  );

  // return (
  //   <AppContext.Consumer>
  //     {({ sourceList, addFavorite, isInFavorites }) => {
  //       let TileClass = SelectableTile;
  //       return (
  //         <SourcesGridStyled>
  //           {Object.keys(sourceList).map((key) => {
  //             const TileClass = isInFavorites(key)
  //               ? DisabledTile
  //               : SelectableTile;
  //             return (
  //               <TileClass key={key} onClick={() => addFavorite(key)}>
  //                 {sourceList[key].name}{' '}
  //               </TileClass>
  //             );
  //           })}
  //         </SourcesGridStyled>
  //       );
  //     }}
  //   </AppContext.Consumer>
  // );
}

export default SourcesGrid;
