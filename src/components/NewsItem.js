import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, imgurl, newsurl, publishTime, author,source} = this.props;
        return (
            <div className="card mx-5">
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">{source}</span>
                <img src={imgurl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-danger">By {author ? author : "Anonymous"} at: {new Date(publishTime).toGMTString()}</small></p>
                    <a href={newsurl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read full article</a>
                </div>
            </div>
        )
    }
}

export default NewsItem
