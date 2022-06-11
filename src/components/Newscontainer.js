import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from "prop-types";
import InfiniteScroll from 'react-infinite-scroll-component';

export class newscontainer extends Component {

    static defaultProps = {
        country: "in",
        pageSize: 9,
        category: "general"
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    constructor() {
        super();
        this.state = {
            articles: [],
            page: 1,
            loading: false,
            totalResults: 0
        }
    }
    async componentDidMount() {
        this.props.setProgress(0);
        document.title = `News App | ${(this.props.category)[0].toUpperCase() + (this.props.category).slice(1)}`;
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?&category=${this.props.category}&country=${this.props.country}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();
        this.props.setProgress(50);
        this.setState({
            articles: parsedData.articles,
            totalPages: parsedData.totalResults,
            totalResults: parsedData.totalResults,
            loading:false
        })
        this.props.setProgress(100);
    }
    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        let url = `https://newsapi.org/v2/top-headlines?&category=${this.props.category}&country=${this.props.country}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalPages: parsedData.totalResults,
            loading: false,
            totalResults: parsedData.totalResults
        })   
    }

    render() {
        return (
            <>
                <h1 className='text-center'>Top {(this.props.category)[0].toUpperCase() + (this.props.category).slice(1)} Headlines</h1>
                {this.state.loading && <Spinner/>}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner/>}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return (
                                    <div key={element.url} className="col-md-4 my-3">
                                        <NewsItem newsurl={element.url} imgurl={element.urlToImage ? element.urlToImage : "https://images.unsplash.com/photo-1478940020726-e9e191651f1a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"} title={element.title ? element.title.slice(0, 30) : ""} description={element.description ? element.description.slice(0, 50) : ""} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className='d-flex justify-content-between'>
                    <button type="button" disabled={this.state.page <= 1} onClick={this.prevClick} className="btn btn-dark mx-3">&larr;&nbsp;Previous</button>
                    <button type="button" disabled={Math.ceil(this.state.totalPages / this.props.pageSize) < this.state.page + 1} onClick={this.nextClick} className="btn btn-dark mx-3">Next&nbsp;&rarr;</button>
                </div> */}
            </>
        )
    }
}

export default newscontainer
