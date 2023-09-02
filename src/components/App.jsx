
import { ButtonLoadMore } from "./Button/Button";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { ImageGalleryItem } from "./ImageGalleryItem/ImageGalleryItem";
import { Searchbar } from "./Searchbar/Searchbar";
import { getApi } from "./Search/search";
import { Component } from "react";

export class App extends Component {
  state = {
    searchTxt: '',
    loadMore: 'false',
    content: [],
    page: 1,
    perPage: 12,
  }

  onSubmit = (searchTxt) => {
    this.setState(({ searchTxt: searchTxt, content: [] }))
  }

  componentDidUpdate(_, prevState,) {
    if (this.state.searchTxt !== prevState.searchTxt || this.state.page !== prevState.page) {
      getApi(this.state.searchTxt, this.state.page, this.state.perPage)
        .then((respons) => {
          this.setState(prevState => ({ content: prevState.content.concat(respons.data.hits) }))
        })
        .finally(
          this.setState({ loadMore: true })
      )
    }
    // if (this.state.content.length !== prevState.content.length) {
    //   this.setState({loadMore : true})
    // }
  }
 
 
  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }))
  }

  render() {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px'
      }}
      >
        <Searchbar
          onSubmit={this.onSubmit}
        ></Searchbar>
        <ImageGallery>
          <ImageGalleryItem
            content={this.state.content}
          >
          </ImageGalleryItem>
        </ImageGallery>
        {this.state.loadMore === true && (
          <ButtonLoadMore
            loadMore={this.loadMore}
          >
          </ButtonLoadMore>
        )}
      </div>
    );
  }

};
