import { ThreeDots } from 'react-loader-spinner'
import { ButtonLoadMore } from "./Button/Button";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { ImageGalleryItem } from "./ImageGalleryItem/ImageGalleryItem";
import { Searchbar } from "./Searchbar/Searchbar";
import { getApi } from "./Search/search";
import { Component } from "react";
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    searchTxt: '',
    loadMore: 'false',
    content: [],
    page: 1,
    perPage: 12,
    isLoad: false,
    isModal: false,
    imgModal: '',
  }



  componentDidUpdate(_, prevState,) {
    if (this.state.searchTxt !== prevState.searchTxt || this.state.page !== prevState.page) {
      this.setState({ loadMore: false, isLoad: true })
      getApi(this.state.searchTxt, this.state.page, this.state.perPage)
        .then((respons) => {
          this.setState(prevState => ({ content: prevState.content.concat(respons.data.hits) }))
        })
        .finally(
          this.setState({ loadMore: true, isLoad: false })
      )
    }
  }
  
  onModalWindow = (value) => {
    if (value.target.className === 'open') {
      this.setState({ isModal: true, imgModal: value.target.alt})
    }
  }

  closeModalWindow = () => {
    this.setState({ isModal: false, imgModal: '' })
  }

  onSubmit = (searchTxt) => {
    this.setState(({ searchTxt: searchTxt, content: [] }))
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
        {this.state.isModal && (
          <Modal
            imgModal={this.state.imgModal}
            closeModalWindow={this.closeModalWindow}
          ></Modal>)}
        
        <Searchbar
          onSubmit={this.onSubmit}></Searchbar>

        <ImageGallery
          onModalWindow={this.onModalWindow}>
          
          <ImageGalleryItem
            content={this.state.content}></ImageGalleryItem>
          
        </ImageGallery>

        {this.state.isLoad && (
          <ThreeDots
            wrapperStyle={{
              justifyContent: 'center',
            }}></ThreeDots>
        )}

        {this.state.loadMore === true && (
          <ButtonLoadMore
            loadMore={this.loadMore}></ButtonLoadMore>
        )}
      </div>
    );
  }

};
