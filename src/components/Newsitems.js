import React, { Component } from 'react';

export class Newsitems extends Component {
  render() {
   
    let{title,description, imageUrl, newsUrl}=this.props;
    return (
      <div>
        <div className="card my-3" style={{ width: '18rem' }}>
          <img src={!imageUrl?"https://tse2.mm.bing.net/th?id=OIP.fXnZcqqzrNCyTu5Irw8rZgHaFB&pid=Api&P=0&h=180":imageUrl} className="card-img-top" alt="Card example" />
          <div className="card-body">
  <h5 className="card-title">{title}...</h5>
  <p className="card-text">{description}...</p>
  <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary">Read More</a>
</div>

        </div>
      </div>
    );
  }
}

export default Newsitems;

