import type PathType from '../lib/constants';
import './path.scss';

function Path({ title, image, url }: PathType) {
  return (
    <div className='path-wrap-inner'>
      <img src={image} alt='' />
      <h2>{title}</h2>
      <a href={url}>View Pathway →</a>
    </div>
  );
}

export default Path;
