import Item from '../components/Item'
import ItemList from '../components/ItemList'
import { useApiContext } from '../contexts/ApiContext'

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
      fetchFunction={api.fetchGroceries.bind(api)}
      fetchCategories={api.fetchCategories.bind(api)}
      itemsFunction={itemsFunction}
    />
  )
}

export default Groceries;
