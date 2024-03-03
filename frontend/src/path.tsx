import type PathType from '../lib/constants';
import './path.scss';

function Path({
  title,
  image,
  url,
  internal_title,
  intro,
  duration,
  type,
  has_summative_assessment,
}: PathType) {
  return (
    <div className='path-wrap-inner'>
      <img src={image} alt={`image of ${title} to represent course`} />
      <div className='text-wrap'>
        <h2 className='course headline'>{title}</h2>
        <p className='course subline'>
          {type} • {duration}
        </p>
        {intro.length ? <h3 className='course intro-text'>{intro}</h3> : null}
        <button>
          <a href={url}>View Pathway →</a>
        </button>
      </div>
    </div>
  );
}

export default Path;
