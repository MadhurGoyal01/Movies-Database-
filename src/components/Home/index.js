import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import Header from '../Header'
import MovieCard from '../MovieCard'

const diffStates = {
  inProgress: 'LOADING',
  success: 'SUCCESS',
  fail: 'FAILURE',
}

class Home extends Component {
  state = {
    status: diffStates.inProgress,
    movieData: [],
    searchInput: '',
    currentPage: 1,
  }

  // Changed to regular method instead of componentDidMount
  getMovies = async (searchTerm = '') => {
    this.setState({status: diffStates.inProgress})
    const {currentPage} = this.state
    const API_KEY = '3a9d77f8'
    try {
      const searchQuery = searchTerm.trim() || 'movie'
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchQuery}&page=${currentPage}&type=movie`,
      )
      const data = await response.json()
      console.log(data)
      if (data.Response === 'True') {
        const updatedData = data.Search.map(each => ({
          id: each.imdbID,
          title: each.Title,
          year: each.Year,
          posterPath: each.Poster,
        }))
        this.setState({status: diffStates.success, movieData: updatedData})
      } else {
        this.setState({status: diffStates.fail})
      }
    } catch (error) {
      console.log(error)
      this.setState({status: diffStates.fail})
    }
  }

  componentDidMount() {
    // Call getMovies in componentDidMount to load initial data
    this.getMovies()
  }

  onSearchChange = event => {
    // Fixed setState syntax
    this.setState({searchInput: event.target.value})
  }

  onSearchSubmit = event => {
    event.preventDefault()
    const {searchInput} = this.state
    this.getMovies(searchInput)
  }

  renderSearchBar = () => {
    const {searchInput} = this.state
    return (
      <form className="search-container" onSubmit={this.onSearchSubmit}>
        <input
          type="text"
          value={searchInput}
          onChange={this.onSearchChange}
          placeholder="Search for movies..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    )
  }

  renderSuccessView = () => {
    const {movieData} = this.state
    console.log(movieData)
    return (
      <div className="movies-container">
        {this.renderSearchBar()}
        <h1 className="heading">Movies</h1>
        {movieData.length > 0 ? (
          <ul className="movies-list-container">
            {movieData.map(each => (
              <MovieCard key={each.id} movieDetails={each} />
            ))}
          </ul>
        ) : (
          <p className="no-movies">No movies found</p>
        )}
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderDiffrentViews = () => {
    const {status} = this.state
    switch (status) {
      case diffStates.inProgress:
        return this.renderLoader()
      case diffStates.success:
        return this.renderSuccessView()
      default:
        return <div className="error-message">Failed to fetch movies</div>
    }
  }

  render() {
    return (
      <div className="home-container">
        <Header />
        {this.renderDiffrentViews()}
      </div>
    )
  }
}

export default Home
