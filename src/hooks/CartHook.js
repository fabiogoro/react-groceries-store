import { useState, useEffect } from "react";
import { postAddCart, postRemoveCart, fetchCart } from '../util/Api'
import { useNavigate } from 'react-router-dom'

export const useCart = (user) => {
  const [data, setData] = useState([]);
  const api = {}

  api.loadCart = async () => setData(await fetchCart())

  useEffect(() => {
    api.loadCart()
  }, []);

  api.addCart = (id, navigate) => {
    return async () => {
      if(user.name){
        setData(await postAddCart(id))
      } else {
        navigate('/login')
      }
    }
  }

  api.removeCart = (id) => {
    return async () => setData(await postRemoveCart(id))
  }

  return [data, api];
};
