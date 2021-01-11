import React, {Component} from 'react';
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios';
import {
  Grid,
  Button,
  Icon,
  Input,
  Segment,
  Header,
  Table,
  Form
} from 'semantic-ui-react';

class CreateTodo extends Component{
    state = {
        title: '',
        desc: '',
        date: '',
      }
      
      handleChange = event =>{
          this.setState({[event.target.name]: event.target.value})
      }
    //   handleChangef = event => {
    //     this.setState({ namaFakultas: event.target.value });
    //   }
    //   handleChangek = event => {
    //     this.setState({ kodeFakultas: event.target.value });
    //   }
      handleSubmit = event => {
        try{
            if(this.state.title.length <1 
              ) {
                   alert('title cannot null')
               } else{
        event.preventDefault();
        axios.post(`http://localhost:4800/`, this.state)
          .then(res => {
            
            console.log(res);
            console.log(res.data);
            window.location.reload()
          })
            }
        }catch (e){
            alert('something wrong!!')
        }
      }
    
    
    
    render(){  
          return(
            <div><Grid>
              <Grid.Row>
                  <Grid.Column>
                      <Segment>
                          <Header as='h2' icon textAlign='center'>
                              <Icon color="red" name='building' circular />
                              <Header.Content>New Todo </Header.Content>
                          </Header> 
           <Form onSubmit={this.handleSubmit}>                    
          <Table celled size="small"  color='blue' inverted singleLine>
              <Table.Header fullWidth>
                  <Table.Row>
                      <Table.HeaderCell>Title name</Table.HeaderCell>
                      <Table.HeaderCell>description name</Table.HeaderCell>
                      <Table.HeaderCell>date</Table.HeaderCell>
                      <Table.HeaderCell>Action</Table.HeaderCell>
                    </Table.Row>
             </Table.Header>
             <Table.Body>
                  <Table.Row>
        <Table.Cell>  <input type="text" name="title" onChange={this.handleChange} /></Table.Cell>
        <Table.Cell>  <input type="text" name="desc" onChange={this.handleChange} /></Table.Cell>
        <Table.Cell>  <input type="text" name="date" onChange={this.handleChange} /></Table.Cell>
           <Table.Cell> <Button >Save</Button> </Table.Cell>
           </Table.Row>
          
            </Table.Body>
        </Table></Form>
    </Segment>
                </Grid.Column>
                </Grid.Row>
                </Grid>
                </div>
                    
        )
    }
}
export default CreateTodo