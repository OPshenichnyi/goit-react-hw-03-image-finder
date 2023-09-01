
import { ButtonLoadMore } from "./Button/Button";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { ImageGalleryItem } from "./ImageGalleryItem/ImageGalleryItem";
import { Searchbar } from "./Searchbar/Searchbar";
import { getApi } from "./Search/search";
import { Component } from "react";

export class App extends Component {
  state = {
    loadMore: false,
    content: [],
    page: 1,
    perPage: 12,
  }
  onSubmit = (searchTxt) => {
    getApi(searchTxt.name, this.state.page, this.state.perPage)
      .then(function (response) {
        console.log(response.data.hits)
        this.setState({ content: response.data.hits })
       
      }) 
  }

  render() {
    return (
      <div>

        <Searchbar
          onSubmit={this.onSubmit}
        ></Searchbar>
        <ImageGallery>
          <ImageGalleryItem>
          </ImageGalleryItem>
        </ImageGallery>
        {this.state.loadMore === true && (
          <ButtonLoadMore>
          </ButtonLoadMore>
        )}
      
      </div>
    );
  }

};
