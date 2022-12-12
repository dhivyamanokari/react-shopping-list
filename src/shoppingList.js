import React , {component}  from "react";
import './shoppingList.css';
class shoppingList extends component{
  condtructor(props){
    super(props)

    this.state = {
      NewItemName : '',
      groceryItems: [
        {name : 'Bananas' , id : 'item-1' , completed:false},
        {name : 'Apples' , id : 'item-2' , completed:truee},
        {name : 'Rice' , id : 'item-3' , completed:false}

      ],
      validationErrors : {},
      submitted: 0
    }

    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleCompleteToggle = this.handleCompleteToggle.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
    this.validateFields = this.validateFields.bind(this)
  }
  handleOnChange(e){
    const target = e.target
    const name = target.name
    const value = target.value

    this.setState({
      [name] : value
    })
  }

  handleCompleteToggle(e){
    const target = e.target
    const itemIndexValue = target.attributes.itemindex.value
    //console.log(itemIndexValue)

    const newGroceryItemState = [...this.state.groceryItems]
    newGroceryItemState[itemIndexValue].completed = target.checked


    this.setState({
      groceryItems: newGroceryItemState
    })
  }

  handleDelete(e){
    const target = e.target
    const itemindexValue = target.attributes.itemindex.value
    const index = parseInt(itemindexValue,10)

    console.log('deleting: + index')

    const newGroceryItemsState = [...this.state.groceryItems]
    newGroceryItemsState.splice(index, 1)
    this.setState({
      groceryItems: newGroceryItemsState
    })
  }

  handleOnSubmit(e){
    e.preventDefault()

    const isFormValid = this.validateFields()
    
    if (isFormValid){
      const newGroceryItemObject = {
        completed: false,
        name: this.state.NewItemName
      }
      this.setState((state) => {
        return {
          submitted: state.submitted + 1,
          newItemName:''
        }
      })
    }
  }

  validateFields(){
    const {
      newItemName
    } = this.state

    const errors = {}
    
    if (!newItemName){
      errors['newItemName'] = 'please enter your name'
    }

    this.setState({
      validationErrors: errors
    })
  }

   render(){
     const{
       newItemName: newItemNameError,
     }

     const {
       groceryItems
     } = this.state
      return(
        <>
        <section>
          <h3> Shopping List </h3>
          { !groceryItems.length && <p> No Items! </p>}
          <ul>
            {
              groceryItems.map((item, index) => {
                return (
                  <li key = {item.id}>
                    <input 
                    type = "checkbox"
                    checked = {item.completed}
                    onChange = {this.handleCompleteToggle}
                    itemindex = {index}
                    />

                    <span>{item.name}</span>
                    <button 
                    itemindex = {index}
                    onClick = {this.handleDelete}
                    >
                      Delete
                      </button>
                      </li>
                )
              })
            }
            </ul>
            <form onSubmit = {this.handleOnSubmit}>
              <label>
                <span className = {this.handleOnSubmit}></span>
                  <input 
                  type = "text"
                  name = "newItemName"
                  placeholder = "Bananas"
                  value = {this.state.newItemName}
                  onChange= {this.handleOnChange}
                  />
                  </label>

                  <button type = "submit">submit</button>

                  <p>Submitted{this.state.submitted} times!</p>
                  </form>
                  </section>
                  </>

      )
    }
  }
export default shoppingList;

