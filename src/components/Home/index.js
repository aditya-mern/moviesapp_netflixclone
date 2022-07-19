import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import Slider from 'react-slick'
// import '~slick-carousel/slick/slick.css'
// import '~slick-carousel/slick/slick-theme.css'

// import Header from '../Header'
import RandomMovieData from '../RandomMovieData'
import TrendingNow from '../TrendingNow'
import TopRatedMovies from '../TopRatedMovies'
import FooterGroup from '../FooterGroup'

import './index.css'

const settings = {
  dots: false,
  infinite: false,
  vertical: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    originalsMoviesList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getOriginalsMovies()
  }

  getOriginalsMovies = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/movies-app/originals`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      // console.log(fetchedData)
      const updatedData = fetchedData.results.map(each => ({
        id: each.id,
        title: each.title,
        backdropPath: each.backdrop_path,
        overview: each.overview,
        posterPath: each.poster_path,
      }))
      this.setState({
        originalsMoviesList: updatedData,
        apiStatus: apiStatusConstants.failure,
      })
      // console.log(updatedData)
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderMoviesListView = () => {
    const {originalsMoviesList} = this.state

    return (
      <ul className="slick-container">
        <Slider {...settings}>
          {originalsMoviesList.map(eachItem => {
            const {id, title, backdropPath} = eachItem
            return (
              <Link to={`/movies/${id}`} className="link">
                <li className="slick-item" key={id}>
                  <img className="logo-image" src={backdropPath} alt={title} />
                </li>
              </Link>
            )
          })}
        </Slider>
      </ul>
    )
  }

  onClickFailureButton = () => {
    this.getOriginalsMovies()
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://res.cloudinary.com/aditya-mern/image/upload/v1657131754/alert-triangle_vrutiu.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">
        Something went wrong. Please try again
      </h1>
      <button
        className="failure-button"
        onClick={this.onClickFailureButton}
        type="button"
      >
        Try Again
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderOriginalsMovies = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderMoviesListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <div className="home-container">
        <RandomMovieData />
        <div className="home-container-lower">
          <div className="trending-now-container">
            <h3 className="heading">Trending Now</h3>
            <TrendingNow />
          </div>
          <div className="top-rated-container">
            <h3 className="heading">Top Rated</h3>
            <TopRatedMovies />
          </div>
          <div className="originals-container">
            <h3 className="heading">Originals</h3>
            {this.renderOriginalsMovies()}
          </div>
          <FooterGroup />
        </div>
      </div>
    )
  }
}
export default Home
