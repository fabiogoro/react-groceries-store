import Item from '../components/Item'
import ItemList from '../components/ItemList'
import { fetchGroceries } from '../util/Api'
import { fetchCategories } from '../util/Api'

function Groceries({user}) {
  function itemsFunction(item, i){
    return <Item key={i} 
      title={item.title}
      image={item.thumbnail}
      price={item.price}
      id={item.id}
      user={user}
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
