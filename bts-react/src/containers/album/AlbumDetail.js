import React from 'react';
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import {Button, Divider, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Avatar, IconButton } from '@material-ui/core';
import NotificationsActiveTwoToneIcon from '@material-ui/icons/NotificationsActiveTwoTone';
import ThumbDownTwoToneIcon from '@material-ui/icons/ThumbDownTwoTone';
import ThumbUpTwoToneIcon from '@material-ui/icons/ThumbUpTwoTone';
import { connect } from 'react-redux';
import { BASE_URL } from '../../utils/environment';
import PoliceView from '../../components/PoliceView';
import * as validation from '../../utils/Validation';


const axios = require('axios');

class AlbumDetail extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            thumbnail: '',
            title: '',
            created: '',
            category: '',
            content: '',
            genre: '',
            musicSet: [],

            comment: '',
            albumcomment_set: [],
            isOpen: false,
            selected: ''
        }
    
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/album/'+ this.props.match.params.id +'/').then( response => {
            let { id, thumbnail, title, created, category, content, genre, music_set,  albumcomment_set} = response.data;
         
            this.setState({ 
                id: id, 
                thumbnail: thumbnail, 
                title: title, 
                created: created, 
                category: category, 
                content:content, 
                genre: genre, 

                albumcomment_set: albumcomment_set
            });
            music_set.forEach(music => {
                let { musicSet } = this.state;
                this.setState({
                    ...this.state,
                    musicSet: musicSet.concat(music)
                });
            });
        }).catch( error => {
        });
    }

    handleChange = (e) => { // target 현재 선택되어 있는 태크
        let nextState = {};
          nextState[e.target.name] = e.target.value;
          this.setState(nextState);
    }
    
// 앨범 댓글
    // 1-1. 댓글 작성
    handleClickCommentAdd = (e) => {
        e.preventDefault();
        if (!validation.validComment(this.state.comment)) {
            alert('내용을 입력하세요');
            return false;
        }

        axios.post('http://127.0.0.1:8000/album/comment/register/' , {
            album : this.state.id,
            author: this.props.currentUser.user_id,
            content: this.state.comment,
        }).then(response => {
            this.commentRender(); // 댓글 리랜더링
            this.setState({
                comment: ''
            })
        }).catch(error => {
            console.log(error);
        });
    }
    
    // 1-2. 댓글 작성 후 댓글리스트 다시 불러오기
    commentRender(){
        axios.get('http://127.0.0.1:8000/album/'+ this.props.match.params.id+ '/').then(response => {
        let {albumcomment_set } = response.data;      
        this.setState({ 
            albumcomment_set: albumcomment_set,
        });
        }).catch( error => {
            console.log(error);
        });
    }
    commentLike = (e) => {
        e.preventDefault();
        let root = e.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode
        axios.post(BASE_URL + 'album/comment/like/register/', {
            comment: root.id,
            author: this.props.currentUser.user_id
        }).then( response => {
            this.commentRender();
        }).catch( error => {
            this.commentRender();
        });
    }
    commentDislike = (e) => {
        e.preventDefault();
        let root = e.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode
        axios.post(BASE_URL + 'album/comment/dislike/register/', {
            comment: root.id,
            author: this.props.currentUser.user_id
        }).then( response => {
            this.commentRender();
        }).catch( error => {
            this.commentRender();
        });
    }
    commentPolice = (e) => {
        let root = e.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode;
        axios.get(BASE_URL + "album/comment/police/")
        this.setState({
            ...this.state,
            isOpen: true,
            selected: root.id
        })
    }
    // 1-3. 댓글 삭제
    handClickCommentDelete = (e) => {
        let comment_id = e.currentTarget.id; 
        axios.delete('http://127.0.0.1:8000/album/comment/delete/'+ comment_id+ '/').then(response => {
            alert("댓글이 삭제되었습니다.");
            this.commentRender();
        }).catch(error =>{
            console.log(error);
        });
    }
    handleClose =(e) => {
        this.setState({
            ...this.state,
            isOpen: false,
            selected: ''
        }, () => {
            this.commentRender();
        });
    }
    render() {
        return (
            <React.Fragment>
            <Header />
            <div className="container-80 my-3">
                <div className="my-3" style={{display: "flex", flexWrap: "wrap", alignItems: "center"}}>
                    <div className="detail-img"><img src={this.state.thumbnail} width="100%" alt="" /></div>
                    <div style={{marginLeft: "2rem"}}>
                        <Typography style={{margin: "1rem"}}>앨범명</Typography>
                        <Typography style={{margin: "1rem"}}>발매일</Typography>
                        <Typography style={{margin: "1rem"}}>카테고리</Typography>
                        <Typography style={{margin: "1rem"}}>장르</Typography>
                    </div>
                    <div>
                        <Typography style={{margin: "1rem"}}>{this.state.title}</Typography>
                        <Typography style={{margin: "1rem"}}>{this.state.created}</Typography>
                        <Typography style={{margin: "1rem"}}>{this.state.category}</Typography>
                        <Typography style={{margin: "1rem"}}>{this.state.genre}</Typography>
                    </div>
                </div>

                <Divider />
                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" width="20%">트랙 번호</TableCell>
                                <TableCell align="center">곡</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.musicSet.map(music => (
                                <TableRow key={music.name} style={{backgroundColor: (music.is_title) ? "#EEEEFF" : ""}}>
                                    <TableCell align="center">{music.track}</TableCell>
                                    <TableCell align="center">{music.name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <div id="content" className="my-3 content-box">
                    <div style={{textAlign: "right"}}>
                        <Button onClick={() => {document.getElementById('content').classList.toggle("content-box")}}>더보기</Button>
                    </div>
                    <div className="pre-box">{this.state.content}</div>
                </div>

        
                {/* 댓글란 */}
                {
                    (this.props.currentUser.username !== '') &&
                    (
                        <React.Fragment>
                            <h3>Comment</h3>
                            <div className="input-group">
                                <textarea className="form-control comment-textarea" name="comment"
                                    value={this.state.comment} onChange={this.handleChange}
                                />
                                <div className="input-group-append">
                                    <button type="submit" className="input-group-text"
                                        onClick={this.handleClickCommentAdd}>작성</button>
                                </div>
                            </div>
                        </React.Fragment>
                    )
                }
                {this.state.albumcomment_set.map((comment, index) => {
                    let isContainsLike = false;
                    let isContainsDislike = false;
                    let isContainsPolice = false;
                    comment.like_set.forEach( like => {
                        console.log(this.props.currentUser.user_id === like.author)
                        if (this.props.currentUser.user_id === like.author) {isContainsLike = true;}
                    })
                    comment.dislike_set.forEach( dislike => {
                        if (this.props.currentUser.user_id === dislike.author) isContainsDislike = true;
                    })
                    comment.police_set.forEach( police => {
                        if (this.props.currentUser.user_id === police.author) isContainsPolice = true;
                    })
                    let grade = <div></div>;
                    let btn2 = '';
                    switch(this.props.currentUser.grade) {
                        case "Bronze":
                            grade = (<Avatar style={{backgroundColor: "#cd7f32"}}>B</Avatar>); break;
                        case "Silver":
                            grade = (<Avatar style={{backgroundColor: "#C0C0C0"}}>S</Avatar>); break;
                        case "Gold":
                            grade = (<Avatar style={{backgroundColor: "#FFD700"}}>G</Avatar>); break;
                        default:
                            grade = (<Avatar style={{backgroundColor: "#B9F2FF", color: "#205055"}}>D</Avatar>); break;
                    }
                    if(comment.author.username == this.props.currentUser.username){              
                        btn2 = (
                            <div>
                                <Button id={comment.id} color="primary" size="small" onClick={this.handClickCommentDelete}>삭제</Button>
                            </div>
                        );
                    }
                    return (
                        <React.Fragment>
                            <div id={comment.id} className="my-3" style={{display: "flex", flexWrap: "nowrap", alignItems: "center"}}>
                                <div>{grade}</div>
                                <div className="inline-block ml-3 w-100">
                                    <Typography><b>{comment.author.nickname}</b></Typography>
                                    <div className="w-100">
                                        <div className="inline">
                                            <span>{comment.content}</span>
                                            <div className="date">
                                                <span className="small mr-2">{comment.created}</span>
                                                <IconButton onClick={this.commentLike} disabled={(this.props.currentUser.username !== '') ? "" : "disalbed"}>
                                                    <ThumbUpTwoToneIcon fontSize="small" style={{color: (isContainsLike) ? "blue" : "" }}/>
                                                    <small style={{color: "black", fontSize: "0.8rem"}}>{comment.like_set.length}</small>
                                                </IconButton>

                                                <IconButton onClick={this.commentDislike} disabled={(this.props.currentUser.username !== '') ? "" : "disalbed"}>
                                                    <ThumbDownTwoToneIcon fontSize="small" style={{color: (isContainsDislike) ? "red" : "" }} />
                                                    <small style={{color: "black", fontSize: "0.8rem"}}>{comment.dislike_set.length}</small>
                                                </IconButton>
                                                {
                                                    this.props.currentUser.username !== '' && 
                                                    (<IconButton onClick={this.commentPolice} disabled={(!isContainsPolice) ? "":  "disabled"}>
                                                        <NotificationsActiveTwoToneIcon fontSize="small" />
                                                    </IconButton>)
                                                }
                                            </div>
                                            {btn2}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    )})} 
            </div>
            <PoliceView 
                comment_id={this.state.selected} 
                user_id={this.props.currentUser.user_id} 
                open={this.state.isOpen} 
                handleClose={this.handleClose}
            />
            <Footer />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => { // 리덕스가 관리하는 상태를 지켜봄, 
    return {
        currentUser: state.auth.status.currentUser
    }
};
AlbumDetail = connect(mapStateToProps)(AlbumDetail);
export default AlbumDetail;