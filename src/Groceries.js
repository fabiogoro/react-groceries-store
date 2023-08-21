import Item from './Item'
import ItemList from './ItemList'
import { fetchGroceries } from './util/Api'
import { fetchCategories } from './util/Api'

function Groceries() {
  function itemsFunction(item, i){
    return <Item key={i} 
      title={item.title}
      image={item.image_path}
      price={item.price}
      id={item.id}
      detailUrl={'/grocery/'}
    />
  }
  return (
    <ItemList 
      title="Groceries" 
      fetchFunction={fetchGroceries}
      fetchCategories={fetchCategories}
      itemsFunction={itemsFunction}
    />
  )
}

export default Groceries;
