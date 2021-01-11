import React, { useEffect, useMemo, useState} from 'react';
import useFullPageLoader from '../../hooks/useFullPageLoader';
import TableHeader from '../../DataTable/Header/index';
import Pagination from '../../DataTable/Pagination/index';
import Search from '../../DataTable/Search/index';
import 'semantic-ui-css/semantic.min.css';
import {
  Grid,
  Button,
  Icon,
  Segment,
  Header,
  Table,
  Modal,
  GridColumn
} from 'semantic-ui-react';
import 'bootstrap/dist/css/bootstrap.css';

import axios from 'axios';
import CreateTodo from './CreateTodo';


const Todo =()=> {
    const [data, setData] = useState([])
    const [loader, showLoader, hideLoader] = useFullPageLoader()
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState("")
    const [sorting, setSorting] = useState({ field: "", order: "" });
    const ITEMS_PER_PAGE = 5;
    const headers = [
        { name: "title", field: "title", sortable: false},
        { name: "desc", field: "desc", sortable: false},
        { name: "date", field: "date", sortable: false},
        { name: "action", field: "action", sortable: false}
    ]
        
   
    useEffect(()=> {
        const getData = () =>{
            showLoader();
           fetch('http://localhost:4800/')
           .then(response => response.json())
           .then(json => {
               hideLoader()
               setData(json)
           })
        };
        getData()
   }, [])
   const commentsData = useMemo(()=> {
       let computedData = data

       if(search){
           computedData = computedData.filter(
               (comment) =>
               comment.desc.toLowerCase().includes(search.toLowerCase()) 
           )
           }

       setTotalItems(computedData.length)
       console.log(currentPage)

       if(sorting.field){
           const reversed = sorting.order === "asc" ? 1 : -1;
           computedData = computedData.sort(
               (a,b) =>
               reversed * a[sorting.field].localeCompare(b[sorting.field])
           )
       }
       //Current Page Slice 
       return computedData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    )
},[data, currentPage, search, sorting])
    
const onSubmit = (id, e)=> {
    try{
     axios.delete(`http://localhost:4800/${id}`)
     .then(res => {
         window.location.reload()
       console.log("successfully delete");;})
     
   }catch{
     alert('something went wrong')
   }
 }
        return( 
            <>
            <div className='container'>
             <Grid>
              <Grid.Row>
                  <Grid.Column>
                      <Segment>
                          <Header as='h2' icon textAlign='center'>
                              <Icon color="red" name='building' circular />
                              <Header.Content>TO DO LIST</Header.Content>
                              
                          </Header><Grid  stackable>
      
  <Grid.Column width={5}> <Modal floated="left" trigger={<Button  color="teal" icon labelPosition="left" size='tiny'>
                              <i className="user icon"></i>Add to-do</Button>} closeIcon>
                                                <Modal.Content>
                                                    <CreateTodo />
                                                </Modal.Content>
                                            </Modal>  </Grid.Column>
                         
    <Grid.Column width={5}>
    <Pagination 
                                            total={totalItems}
                                         itemsPerPage={ITEMS_PER_PAGE}
                                         currentPage={currentPage}
                                            onPageChange={page => setCurrentPage(page)}/></Grid.Column>
                            <Grid.Column><Search onSearch={value=>{
                        setSearch(value);
                        setCurrentPage(1)
                    }}/></Grid.Column>
                     </Grid> 
            <Table>
            <center>{loader}</center>
            <TableHeader headers={headers}
                    onSorting={(field, order) =>
                    setSorting({field, order})}/>  
                  
              
              {commentsData.map(( comment, index)=> (
                <Table.Body>
                  <Table.Row  key={index}>
                      <Table.Cell  scope="row" key={comment.id} >{comment.title}</Table.Cell>
                      <Table.Cell>{comment.desc}</Table.Cell>
                      <Table.Cell>{comment.date}</Table.Cell>
                      <Table.Cell><Button color='red' onClick={(e) => onSubmit(comment.id, e)}>
           Delete
          </Button></Table.Cell>
                  </Table.Row>
              </Table.Body>     ))}
          </Table></Segment>
                  </Grid.Column>
              </Grid.Row>
          </Grid>
       
      </div>
      </>
        )
    }

export default Todo
