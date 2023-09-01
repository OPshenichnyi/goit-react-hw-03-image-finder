
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

  addContent = ({data:{hits}}) => {
    this.setState(prevState => ({ content: prevState.content.concat(hits) }))
    
  }

  onSubmit = (searchTxt) => {
    this.setState({ content: [] });
     getApi(searchTxt.name, this.state.page, this.state.perPage)
      .then((respons) => {
        this.addContent(respons);
      })
    
  }

  render() {
    console.log();
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
          <ButtonLoadMore>
          </ButtonLoadMore>
        )}
      </div>
    );
  }

};
