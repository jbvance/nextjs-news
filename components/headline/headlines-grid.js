import Headline from './headline';
import classes from './headlines-grid.module.css';

function HeadlinesGrid({ headlines }) {
  return (
    <div className={classes.headlines_grid}>
      {headlines.map((headline, index) => {
        return <Headline key={index} headline={headline} />;
      })}
    </div>
  );
}
export default HeadlinesGrid;
