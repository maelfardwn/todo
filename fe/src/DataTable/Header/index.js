import React, { useState } from 'react'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Table} from 'semantic-ui-react';

const Header = ({headers, onSorting}) => {
    
    const [sortingField, setSortingField] = useState("")
    const [sortingOrder, setSortingOrder] = useState("asc")

    const onSortingChange = field => {
        const order =
        field === sortingField && sortingOrder === "asc" ? "desc" : "asc";

        setSortingField(field)
        setSortingOrder(order)
        onSorting(field, order)
    }
    return(   <Table.Header fullWidth>
                  <Table.Row>
                      {headers.map( ({name, field, sortable}) => (
                      <Table.HeaderCell key={name} 
                        onClick={()=> sortable ? onSortingChange(field): null} >{name}{sortingField === field && (
                            <FontAwesomeIcon icon={
                                sortingOrder === "asc" ? "arrow-down" : "arrow-up"
                            }
                            />  )}</Table.HeaderCell>
                            ))}
                  </Table.Row>
              </Table.Header>
           
    )
}
export default Header