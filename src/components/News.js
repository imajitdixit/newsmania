import React, { Component } from 'react';
import PropTypes from 'prop-types'; // Ensure PropTypes is imported
import Newsitems from './Newsitems';
import Spinner from './Spinner';

export class News extends Component {

  // Default props for the component
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  };

  // Prop types validation
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    };
  }

  async componentDidMount() {
    console.log("cdm");
    let url = `{USE YOUR API KEY};
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ 
      articles: parsedData.articles, 
      totalResults: parsedData.totalResults,
      loading: false 
    });
  }

  handlePreviousClick = async () => {
    console.log("Previous clicked");
    let url = `{USE YOUR API KEY}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ 
      articles: parsedData.articles,
      page: this.state.page - 1,
      loading: false
    });
  };

  handleNextClick = async () => {
    console.log("Next clicked");
    if (this.state.page + 1 <= Math.ceil(this.state.totalResults / this.props.pageSize)) {
      let url = `{USE YOUR API KEY};
      this.setState({ loading: true });
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({ 
        articles: parsedData.articles,
        page: this.state.page + 1, 
        loading: false
      });
    }
  };

  render() {
    console.log("render");
    return (
      <div className="container my-3">
        <h1 className="text-center">NewsMania: Top Headlines</h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <Newsitems
                  title={element.title}
                  description={element.description}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>

        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>
            &larr; Previous
          </button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
            type="button" className="btn btn-dark" onClick={this.handleNextClick}>
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
