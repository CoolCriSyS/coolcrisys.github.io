import React, { Component } from 'react'
import './App.css'

document.ontouchmove = (event) => {
  event.preventDefault()
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      btcAmount: '0.00',
      ethAmount: '0.00',
      ltcAmount: '0.00',
      refreshInterval: 1,
      seconds: 60
    }

    this.getBtcPrice = this.getBtcPrice.bind(this)
    this.getEthPrice = this.getEthPrice.bind(this)
    this.getLtcPrice = this.getLtcPrice.bind(this)
  }

  getBtcPrice() {
    let apiURL = 'https://api.coinbase.com/v2/prices/BTC-USD/spot'

    fetch(apiURL).then(
      (response) => response.json()
    ).then(
      (json) => {
        let data = json.data
        this.setState({ btcAmount: data.amount })
      }
    ).catch(
      (err) => {
        console.error('Network error: ' + err);
      }
    )
  }

  getEthPrice() {
    let apiURL = 'https://api.coinbase.com/v2/prices/ETH-USD/spot'

    fetch(apiURL).then(
      (response) => response.json()
    ).then(
      (json) => {
        let data = json.data
        this.setState({ ethAmount: data.amount })
      }
    ).catch(
      (err) => {
        console.error('Network error: ' + err);
      }
    )
  }

  getLtcPrice() {
    let apiURL = 'https://api.coinbase.com/v2/prices/LTC-USD/spot'

    fetch(apiURL).then(
      (response) => response.json()
    ).then(
      (json) => {
        let data = json.data
        this.setState({ ltcAmount: data.amount })
      }
    ).catch(
      (err) => {
        console.error('Network error: ' + err);
      }
    )
  }

  componentWillMount() {
    this.getBtcPrice()
    this.getEthPrice()
    this.getLtcPrice()
  }

  componentDidMount() {
    setInterval(() => {
      if (this.state.seconds === 0) {
        this.getBtcPrice()
        this.getEthPrice()
        this.getLtcPrice()
        this.setState((prevState) => ({
          seconds: (this.state.refreshInterval * 60)
        }))
      } else {
        this.setState((prevState) => ({
          seconds: prevState.seconds - 1
        }))
      }

    }, 1000)
  }

  render() {
    return (
      <div className="App">
        <div className="container-fluid">

          <div className="currency">
            <div className="price">
              <h1 className="display-1">
                BTC: {this.state.btcAmount}
              </h1>
            </div>
          </div>
          <div className="currency">
            <div className="price">
              <h1 className="display-1">
                ETH: {this.state.ethAmount}
              </h1>
            </div>
          </div>
          <div className="currency">
            <div className="price">
              <h1 className="display-1">
                LTC: {this.state.ltcAmount}
              </h1>
              <h2 className="refreshStatus">{this.state.seconds} </h2>
            </div>
          </div>

        </div>
      </div>

    );
  }
}

export default App
