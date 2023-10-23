import Item from '../components/Item'
import ItemList from '../components/ItemList'
import { useApiContext } from '../contexts/ApiContext'
import { fetchGroceries } from '../api/GroceryApi'
import { fetchCategories } from '../api/CategoryApi'

export interface Item{
  title:string,
  thumbnail:string,
  price:string,
  id:number
}

function Groceries() {
  const api = useApiContext()

  function itemsFunction(item:Item, i:number){
    return <Item key={i} 
      title={item.title}
      image={item.thumbnail}
      price={item.price}
      id={item.id}
      detailUrl={'/grocery/'}
    />
  }

  return (
    <ItemList 
      title="Groceries" 
      fetchFunction={fetchGroceries.bind(api)}
      fetchCategories={fetchCategories.bind(api)}
      itemsFunction={itemsFunction}
    />
  )
}

export default Groceries;
