import { useContext, useEffect } from 'react';
import HeadlinesContext from '../../store/headlines-context';
import Headline from './headline';
import classes from './headlines-grid.module.css';

function HeadlinesGrid({ headlines }) {
  const headlinesCtx = useContext(HeadlinesContext);

  if (headlinesCtx.isLoading) {
    return <p>Loading...</p>;
  }

  if (!headlinesCtx.headlines || headlinesCtx.headlines.length === 0) {
    return <h2>Unable to load headlines</h2>;
  }

  return (
    <div className={classes.headlines_grid}>
      {headlinesCtx.headlines.map((headline, index) => {
        return <Headline key={index} headline={headline} />;
      })}
    </div>
  );
}
export default HeadlinesGrid;
