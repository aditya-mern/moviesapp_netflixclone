import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RandomMovieData extends Component {
  state = {
    randomMovieData: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRandomMovieData()
  }

  getRandomMovieData = async () => {
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
      const updatedData = fetchedData.results.map(each => ({
        id: each.id,
        title: each.title,
        backdropPath: each.backdrop_path,
        overview: each.overview,
        posterPath: each.poster_path,
      }))

      // Returns a random integer from 0 to 9
      const randomIndex = Math.floor(Math.random() * 10)
      const randomMovieData = updatedData[randomIndex]
      // console.log(randomMovie)

      this.setState({
        randomMovieData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderRandomMovieData = () => {
    const {randomMovieData} = this.state
    const {posterPath, title, overview} = randomMovieData

    return (
      <div
        className="home-container-upper"
        style={{
          backgroundImage: `url(${posterPath})`,
        }}
      >
        <div className="header-container">
          <Header />
        </div>
        <div className="random-movie-container">
          <div className="mid-container">
            <div className="inner-mid-container">
              <h1 className="random-heading">{title}</h1>
              <p className="random-para">{overview}</p>
              <button className="play-button" type="button">
                Play
              </button>
            </div>
          </div>
          <div className="gradient-container">{null}</div>
        </div>
      </div>
    )
  }

  onClickFailureButton = () => {
    this.getRandomMovieData()
  }

  renderFailureView = () => (
    <div className="home-container-upper">
      <div className="header-container">
        <Header />
      </div>
      <div className="random-failure-view-container">
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
    </div>
  )

  renderLoadingView = () => (
    <div className="home-container-upper">
      <div className="header-container">
        <Header />
      </div>
      <div className="random-loader-container" testid="loader">
        <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
      </div>
    </div>
  )

  renderRandomMovie = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRandomMovieData()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderRandomMovie()}</>
  }
}
export default RandomMovieData
