import React, {Component} from 'react'
import {Input, Button, Header, Form, Modal } from 'semantic-ui-react'
import axios from 'axios';
class EditKategori extends Component{
   constructor(props) {
     super(props)
     this.state ={
     kategori:{
    id : this.props.id,
    nama_kategori: '',},
   
   show: false
   }}

   modalClose=()=>{
     this.setState({ show: false})
   }
   modalOpen=()=>{
    this.setState({ show: true})
  }
  changeHandler = (e) => {
    let newEmployee = { ...this.state.kategori }
    newEmployee[e.target.name] = e.target.value
    this.setState({
        kategori: newEmployee
    }, () => console.log(this.state.kategori))

}

onSubmit = ()=> {
     try{
      axios.put(`http://localhost:4800/kategori/`, this.state.kategori)
      .then(res => {
        console.log(res.data);
        this.setState({ show: false});
        window.location.reload();})
      
    }catch{
      alert('something went wrong')
    }
  }

    render(){
      
      return (
      <Modal
        onClose={this.modalClose}
        onOpen={this.modalOpen}
        open={this.state.show}
        trigger={<Button color='teal'>Ubah</Button>}
      >
        <Modal.Header>Form Ubah</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Header>Ubah Data</Header>
            <Form onSubmit={this.onSubmit}>
                <Form.Group>
                <Form.Field>
                  <label>Id {this.props.id}</label>
                <input placeholder='Id' name="id"  value={this.state.kategori.id} readOnly={true}/></Form.Field>  
                <Form.Field>
                <label>kategori {this.props.kategori}</label>
                <input placeholder='kategori' name="nama_kategori"  onChange={this.changeHandler} />
                </Form.Field> 
                </Form.Group> 
                <Button
            content="Simpan"
            labelPosition='right'
            icon='checkmark'
            positive
          />   
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          
          <Button color='red' onClick={this.modalClose}>
           Batal
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}
  export default EditKategori
  