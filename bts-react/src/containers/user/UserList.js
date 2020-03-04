import React from 'react';
import { Table, TableContainer,TableRow, TableCell, TableBody, TableHead, Avatar, Modal} from '@material-ui/core';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '@material-ui/core/Button';
import {Dialog, DialogActions,DialogContent,DialogTitle } from '@material-ui/core'

const axios = require('axios');

class UserList extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
        userList: [], // post 리스트
        currentPage : 1, // 현재 페이지 위치
        pageSize : 10, // 한 페이지에 보여줄 컨텐츠 갯수

        id: '',
        info:[],
        isDialogOpen: false,
    }
    console.log(document.cookie);

  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/user/').then(response => {
        let responses = response.data;
        responses.forEach(element => {
            const {userList} = this.state;
            this.setState({
              ...this.state,
              userList: userList.concat(element)
            }, () => { // callback 함수: 끝나면 이 함수를 실행
              console.log(this.state.userList); 
            }) 
           // setState는 비동기적
        });
    });
  }
  

handleClickAlbum = (e) => {
  console.log(e.currentTarget);
}

userDelete = (e) => {
  axios.post('http://127.0.0.1:8000/user/delete/'+this.state.id+'/', {
    id: this.state.id,

  }).then(response => {
    // modal. 탈퇴처리가 완료되었습니다.

    window.location.href = "/userList"
  }).catch(error => {
    console.log(error);
  })
}

openDialog = (e) => {
 // this.state.id = this.state.id
  axios.get('http://127.0.0.1:8000/user/'+this.state.id+'/').then(response => {
    let responses = response.data;
    console.log(this.state.id);
   // console.log(id);
/*
    responses.forEach(element =>{
      const {info} = this.state;
      this.state({
        ...this.state,
        info: info.concat(element),
      }, () => {
          <Dialog open={true}>
            <DialogTitle>고객정보</DialogTitle>
            <DialogContent>
              {info.id}<br/>
              {info.username}<br/>
              {info.grade}
            </DialogContent>
            <DialogActions>
            <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
           </DialogActions>
        </Dialog>
      }) 
    }); */
  });  
}
  
handleClose = () => {
  this.setState({ isDialogOpen: false });
}

  render(){     
    return(
      <React.Fragment>
        <Header />
        <div className="contain" style={{marginLeft: "3rem", marginTop: "3rem", marginRight: "3rem"}}>
          <div style={{margin: "auto", textAlign: "center", marginBottom: "1rem"}}>

            <Table className="table" style={{margin: "auto", width: '80%'}} >
              <TableHead style={{backgroundColor: "#EEEEFF"}}>
                <TableRow>
                  <TableCell style={{width: '10%'}}>번호</TableCell>
                  <TableCell style={{width: '40%'}}>이메일</TableCell>
                  <TableCell style={{width: '20%'}}>닉네임</TableCell>
                  <TableCell style={{width: '10%'}}>등급</TableCell>
                  <TableCell align='center' style={{width: '10%'}}>확인</TableCell>
                  <TableCell align='center' style={{width: '10%'}}>탈퇴</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {
                this.state.userList.map(user => {
                  let level = <div></div>;
                  switch(user.grade){
                    case "Bronze":
                      level = <Avatar style={{backgroundColor: "#cd7f32"}}>B</Avatar> ; break;
                    case "Silver":
                      level = <Avatar style={{backgroundColor: "#C0C0C0"}}>S</Avatar>;  break;
                    case "Gold":
                      level = <Avatar style={{backgroundColor: "#FFD700"}}>G</Avatar>; break;
                    default:
                      level = <Avatar style={{backgroundColor: "#B9F2FF", color: "#205055"}}>D</Avatar>; break;
                  }

                  return (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.nickname}</TableCell>
                      <TableCell>
                        {level}
                      </TableCell>  
                      <TableCell>
                        <Button id={user.id} variant="outlined" color="primary" onClick={this.openDialog}>확인</Button>
                          {
                       /*     this.state.isDialogOpen &&
                         <Dialog open={this.state.isDialogOpen}>
                            <DialogTitle>고객정보</DialogTitle>
                              <DialogContent>
                                {user.id}<br/>
                                {user.username}<br/>
                                {user.grade}
                              </DialogContent>
                            <DialogActions>
                                <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                            </DialogActions>
                          </Dialog>
                          */
                        }
                      </TableCell>
                      <TableCell><Button variant="outlined" color="primary" size="1rem" >탈퇴</Button></TableCell>
                    </TableRow>
                  )
                })
              }
              </TableBody>
              </Table>                 
          </div>
       </div>
       <Footer/>
      </React.Fragment>
    );
  }
}

export default UserList;  