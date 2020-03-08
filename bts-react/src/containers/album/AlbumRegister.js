import React, {PureComponent} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import { Table, TableRow, TableCell, TableBody, TableHead, Input} from '@material-ui/core';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import * as env from '../../utils/environment';
import * as validation from '../../utils/Validation';


const axios = require('axios')

class AlbumRegister extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      thumbnail:  null,
      title: '',
      category: "",
      genre: "",
      created: '',
      content : '',
      
      track: 1,
      name: '',
      is_title: false,

      music_list: [],
      validSubmit: false
    }
  }
  
  render(){
    return(
      <React.Fragment>
        <Header />
        <div className="container-70 my-3">
          <form onSubmit={this.onSubmit}>
            <small><b>앨범 정보</b></small>
            <Table className="my-3">
              <TableBody>

                <TableRow>
                  <TableCell style={{width: '20%' }}>썸네일</TableCell>
                  <TableCell style={{width: '80%'}}>
                    <input name="thumbnail" type="file" onChange={this.handleChange} />
                  </TableCell>
                </TableRow>
    
                <TableRow>
                  <TableCell style={{width: '20%'}}>앨범명</TableCell>
                  <TableCell style={{width: '80%'}}>
                    <TextField fullWidth name="title" value={this.state.title} onChange={this.handleChange} />
                  </TableCell>
                </TableRow>
              
                <TableRow>
                  <TableCell style={{width: '20%'}}>카테고리</TableCell>
                  <TableCell style={{width: '80%'}}>
                    <Select native name="category" value={this.state.category} onChange={this.handleChange} defaultValue=""> 
                      <option value="">선택</option>
                      {env.CATEGORY.map((category, index) =>
                        <option value={category} key={index}>{category}</option>
                      )}
                    </Select>
                  </TableCell>
                </TableRow>
    
                <TableRow>
                  <TableCell style={{width: '20%'}}>장르</TableCell>
                  <TableCell style={{width: '80%'}}>
                    <Select native name="genre" value={this.state.genre} onChange={this.handleChange} defaultValue="">
                    <option value="">선택</option>
                      {env.GENRE.map((genre, index) => 
                        <option value={genre} key={index}>{genre}</option>
                      )}
                    </Select>
                  </TableCell>
                </TableRow>
    
                <TableRow>
                  <TableCell style={{width: '20%'}}>발매일</TableCell>
                  <TableCell style={{width: '80%'}}>
                    <TextField name="created" type="date" value={this.state.created} onChange={this.handleChange} />
                  </TableCell>
                </TableRow>
    
                <TableRow>
                  <TableCell style={{width: '20%'}}>앨범소개</TableCell>
                  <TableCell style={{width: '80%'}}>
                    <TextField
                      multiline
                      rows="5"
                      variant="outlined"
                      fullWidth
                      name="content" 
                      value={this.state.content} onChange={this.handleChange} />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
  
            <small><b>수록곡</b></small>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{width: '20%'}}>트랙</TableCell>
                  <TableCell style={{width: '50%'}}>곡명</TableCell>
                  <TableCell style={{width: '20%'}}>대표</TableCell>
                  <TableCell style={{width: '10%'}}>선택</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.music_list.map((music, index) => {
                  return (
                  <TableRow key={index}>
                    <TableCell>{music.track}</TableCell>
                    <TableCell>{music.name}</TableCell>
                    <TableCell><input type="checkbox" name="is_title" checked={music.is_title ? "checked" : ""} /></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                )})}
                <TableRow>
                  <TableCell>
                    <TextField type="number" inputProps={{ min: "1" }} name="track" value={this.state.track} onChange={this.handleChange}/>
                  </TableCell>
                  <TableCell>
                    <TextField fullWidth name="name" value={this.state.name} onChange={this.handleChange} />
                  </TableCell>
                  <TableCell>
                    <input type="checkbox" name="is_title" checked={this.state.is_title} onChange={this.handleChange} />
                  </TableCell>
                  <TableCell>
                    <Button onClick={this.handleAdd}>추가</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="my-3">
              <Button type="submit" 
                fullWidth 
                onClick={this.handleSubmit} 
                disabled={!this.state.validSubmit} 
                variant="contained"
                color="primary">등록</Button>
            </div>
          </form>
        </div>
        <Footer />
        </React.Fragment>
      );
    }

  handleChange = (e) => {
    let nextState = {};
    if (e.target.name === "is_title") nextState[e.target.name] = e.target.checked;
    else if (e.target.name === "thumbnail") nextState[e.target.name] = e.target.files[0];
    else nextState[e.target.name] = e.target.value;
    
    this.setState(nextState, () => {
      this.setState({
        validSubmit: validation.validAlbumRegister(this.state)
      })
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    let { thumbnail, title, category, genre, created, content, music_list } = this.state;
    music_list = JSON.stringify(music_list);

    formData.append('thumbnail', thumbnail);
    formData.append('title', title);
    formData.append('category', category);
    formData.append('genre', genre);
    formData.append('created', created);
    formData.append('content', content);
    formData.append('music_list', music_list);
    
    axios.post(env.BASE_URL + 'album/register/', formData).then( response => {
      window.location.replace('/')
    }).catch( error => {
      console.log(error);
    });
  }

  handleAdd = (e) => {
    e.preventDefault();
    let {track, name, is_title, music_list } = this.state;
    this.setState({
      ...this.state,
      track: track + 1,
      music_list: music_list.concat({track: track, name: name, is_title: is_title})
    }, () => {
      this.setState({
        ...this.state,
        name: '',
        is_title: false,
        validSubmit: validation.validAlbumRegister(this.state)
      });
    })

  }
}


export default AlbumRegister;