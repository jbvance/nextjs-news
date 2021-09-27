import classes from './headline.module.css';

function Headline({ headline }) {
  return (
    <div className={classes.headline}>
      <div className={classes.image}>
        <img
          className={classes.responsive_image}
          src={headline.urlToImage || '/images/no-image.jpg'}
          alt={headline.title}
        />
      </div>
      <div className={classes.headline_text}>
        <div className={classes.headline_title}>
          <a href={headline.url}>{headline.title}</a>
        </div>
        <div className={classes.headline_text_item}>{headline.description}</div>
      </div>
    </div>
  );
}

export default Headline;
