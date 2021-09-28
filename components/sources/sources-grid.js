import { AddableTile, DisabledTile, DeletableTile } from '../ui/tile';
import classes from './sources-grid.module.css';

function SourcesGrid({ sourceList, deletable = false, disabled = false }) {
  return (
    <div className={classes.sourcesGrid}>
      {sourceList.map((source) => {
        if (deletable) {
          return (
            <DeletableTile key={source.id} id={source.id}>
              <span>&times;</span>
              {source.name}
            </DeletableTile>
          );
        }
        if (disabled) {
          return (
            <DisabledTile key={source.id} sourceId={source.id}>
              {source.name}
            </DisabledTile>
          );
        }
        return (
          <AddableTile key={source.id} item={source}>
            {source.name}
          </AddableTile>
        );
      })}
    </div>
  );
}

export default SourcesGrid;
