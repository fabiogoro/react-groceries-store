import Item from '../components/Item'
import ItemList from '../components/ItemList'
import { useApiContext } from '../contexts/ApiContext'
import { fetchGroceries } from '../api/GroceryApi'
import { fetchCategories } from '../api/CategoryApi'

function Groceries() {
  const api = useApiContext()

  function itemsFunction(item, i){
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
