import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Header from '../Header'
// import SimilarProductItem from '../SimilarProductItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MoviesItemDetails extends Component {
  state = {
    movieData: {},
    similarMoviesData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getMovieData()
  }

  getFormattedData = data => ({
    id: data.id,
    title: data.title,
    backdropPath: data.backdrop_path,
    posterPath: data.poster_path,
  })

  getMovieData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = {
        id: fetchedData.movie_details.id,
        title: fetchedData.movie_details.title,
        backdropPath: fetchedData.movie_details.backdrop_path,
        posterPath: fetchedData.movie_details.poster_path,
        adult: fetchedData.movie_details.adult,
        budget: fetchedData.movie_details.budget,
        genres: fetchedData.movie_details.genres,
        overview: fetchedData.movie_details.overview,
        releaseDate: fetchedData.movie_details.release_date,
        runtime: fetchedData.movie_details.runtime,
        spokenLanguages: fetchedData.movie_details.spoken_languages,
        voteAverage: fetchedData.movie_details.vote_average,
        voteCount: fetchedData.movie_details.vote_count,
      }
      // console.log(updatedData)
      const updatedSimilarMoviesData = fetchedData.movie_details.similar_movies.map(
        each => this.getFormattedData(each),
      )
      // console.log(updatedSimilarMoviesData)
      this.setState({
        movieData: updatedData,
        similarMoviesData: updatedSimilarMoviesData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="product-details-error-view-container">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error-view-image"
      />
      <h1 className="product-not-found-heading">Product Not Found</h1>
      <button type="button" className="button">
        Continue Shopping
      </button>
    </div>
  )

  renderProductDetailsView = () => {
    const {movieData} = this.state
    const {title, overview, posterPath} = movieData
    return (
      <div className="home-container">
        <div
          className="home-container-upper"
          style={{
            backgroundImage: `url(${posterPath})`,
          }}
        >
          <div className="header-container">
            <Header />
          </div>
          <div className="random-movie-container1">
            <div className="mid-container">
              <div className="inner-mid-container">
                <h1 className="random-heading">{title}</h1>
                <p className="random-para">{overview}</p>
                <button className="play-button" type="button">
                  Play
                </button>
              </div>
            </div>
            {/* <div className="gradient-container">{null}</div> */}
          </div>
        </div>
        <div className="home-container-lower">
          <h3>Movies Item Details</h3>
        </div>
      </div>
    )
  }

  renderProductDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderProductDetails()}</>
  }
}

export default MoviesItemDetails
