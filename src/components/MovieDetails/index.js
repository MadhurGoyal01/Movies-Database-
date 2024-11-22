import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const diffStates = {
  inProgress: 'LOADING',
  success: 'SUCCESS',
  fail: 'FAILURE',
}

class MovieDetails extends Component {
  state = {
    movieDetails: {},
    status: diffStates.inProgress,
  }

  componentDidMount() {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    // Get movie ID from URL params
    const {match} = this.props
    const {params} = match
    const {id} = params

    const API_KEY = '3a9d77f8'

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`,
      )
      const data = await response.json()
      console.log('Movie Details:', data)

      if (data.Response === 'True') {
        this.setState({
          movieDetails: data,
          status: diffStates.success,
        })
      } else {
        this.setState({status: diffStates.fail})
      }
    } catch (error) {
      console.log(error)
      this.setState({status: diffStates.fail})
    }
  }

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <button
        type="button"
        className="retry-button"
        onClick={this.getMovieDetails}
      >
        Try Again
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {movieDetails} = this.state
    const {
      Title,
      Year,
      Rated,
      Runtime,
      Genre,
      Director,
      Writer,
      Actors,
      Plot,
      Language,
      Country,
      Awards,
      Poster,
      imdbRating,
      BoxOffice,
      Production,
    } = movieDetails

    return (
      <div className="movie-details-container">
        <div className="movie-details-card">
          <div className="movie-poster-container">
            <img src={Poster} alt={Title} className="movie-poster" />
          </div>
          <div className="movie-info-container">
            <h1 className="movie-title">{Title}</h1>
            <div className="movie-meta-data">
              <p className="movie-year">{Year}</p>
              <p className="movie-rating">{Rated}</p>
              <p className="movie-runtime">{Runtime}</p>
            </div>
            <div className="movie-rating-container">
              <p className="rating-label">IMDb Rating</p>
              <p className="rating-value">⭐ {imdbRating}/10</p>
            </div>
            <div className="movie-plot">
              <h2 className="section-heading">Plot</h2>
              <p className="plot-text">{Plot}</p>
            </div>
            <div className="movie-details-grid">
              <div className="detail-item">
                <h3 className="detail-label">Genre</h3>
                <p className="detail-value">{Genre}</p>
              </div>
              <div className="detail-item">
                <h3 className="detail-label">Director</h3>
                <p className="detail-value">{Director}</p>
              </div>
              <div className="detail-item">
                <h3 className="detail-label">Cast</h3>
                <p className="detail-value">{Actors}</p>
              </div>
              <div className="detail-item">
                <h3 className="detail-label">Language</h3>
                <p className="detail-value">{Language}</p>
              </div>
              {Awards && (
                <div className="detail-item">
                  <h3 className="detail-label">Awards</h3>
                  <p className="detail-value">{Awards}</p>
                </div>
              )}
              {BoxOffice && (
                <div className="detail-item">
                  <h3 className="detail-label">Box Office</h3>
                  <p className="detail-value">{BoxOffice}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderDifferentViews = () => {
    const {status} = this.state
    switch (status) {
      case diffStates.inProgress:
        return this.renderLoader()
      case diffStates.success:
        return this.renderSuccessView()
      case diffStates.fail:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="movie-details-page">{this.renderDifferentViews()}</div>
      </>
    )
  }
}

export default MovieDetails
