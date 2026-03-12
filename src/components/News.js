import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Newsitems from './Newsitems';
import Spinner from './Spinner';

export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apiKey: PropTypes.string.isRequired, // ✅ API KEY must be passed from parent
  };

  constructor(props) {  // ✅ props must be received here
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
  }

  async componentDidMount() {
    this.updateNews();
  }

  async updateNews() {
    const { country, category, pageSize, apiKey } = this.props;
    const { page } = this.state;
    
    // ✅ Use Vercel Serverless Proxy to bypass browser/CORS restrictions
    const url = `/api/news?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
    
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    
    this.setState({ 
      articles: parsedData.articles, 
      totalResults: parsedData.totalResults,
      loading: false 
    });
  }

  handlePreviousClick = async () => {
    this.setState({ page: this.state.page - 1 }, this.updateNews);
  };

  handleNextClick = async () => {
    if (this.state.page + 1 <= Math.ceil(this.state.totalResults / this.props.pageSize)) {
      this.setState({ page: this.state.page + 1 }, this.updateNews);
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">NewsMania: Top Headlines</h1>
        {this.state.loading && <Spinner />}

        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <Newsitems
                  title={element.title || "No Title"}
                  description={element.description || "No Description"}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>

        <div className="container d-flex justify-content-between my-3">
          <button 
            disabled={this.state.page <= 1} 
            type="button" 
            className="btn btn-dark" 
            onClick={this.handlePreviousClick}>
            &larr; Previous
          </button>

          <button 
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
            type="button" 
            className="btn btn-dark" 
            onClick={this.handleNextClick}>
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
