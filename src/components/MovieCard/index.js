import {Link} from 'react-router-dom'
import './index.css'

const MovieCard = props => {
  const {movieDetails} = props
  const {id, title, year, posterPath} = movieDetails

  return (
    <li className="movie-card">
      <Link to={`/movie/${id}`} className="movie-link">
        <img src={posterPath} alt={title} className="movie-poster" />
        <div className="movie-details">
          <h2 className="movie-title">{title}</h2>
          <p className="movie-year">{year}</p>
        </div>
      </Link>
    </li>
  )
}

export default MovieCard
