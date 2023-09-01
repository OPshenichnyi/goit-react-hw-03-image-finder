
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

  componentDidUpdate(prevProps, prevState,) {
    if (this.state.content.length !== prevState.content.length) {
      this.setState({loadMore : true})
    }
  }

  }
  
  addContent = () => {
    getApi(this.state.searchTxt, this.state.page, this.state.perPage)
      .then((respons) => {
        console.log(respons);
        this.setState(prevState => ({ content: prevState.content.concat(respons.data.hits) }))
      })
  }

onSubmit = (searchTxt) => {
    this.setState(({searchTxt: searchTxt}))
    this.setState({ content: [] });
    this.addContent()
  }

  loadMore = () => {
    this.addContent();
    
  }

  render() {
    return (
      <div>
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
