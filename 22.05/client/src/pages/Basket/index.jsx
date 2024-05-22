import { useContext } from "react"
import { BasketContext } from "../../context/basketContext"
import { Flex } from "antd"


const Basket = () => {
  const{basket,setBasket}=useContext(BasketContext)
  return (
    <div style={{width:'40%', border:'1px solid black',margin:"70px auto",padding:"200px 0"}}>
      <h3>Basket</h3>
        <ul style={{display:"flex",flexDirection:"column",gap:"15px"}}>
          {basket && basket.map((basketItem)=>{
            return <li style={{listStyle:"none"}}>
              <span>{basketItem.title} | <b>{basketItem.count}</b></span>
              <button onClick={()=>{
                let currentItem=basket.find((x)=>x._id==basketItem._id);
                if (currentItem.count>1) {
                  currentItem.count-=1;
                setBasket([...basket]);
                localStorage.setItem("basket",JSON.stringify([...basket]))
                } else {
                  let uptadeItem=basket.filter((x)=>x._id!=basketItem._id);
                setBasket([...uptadeItem]);
                localStorage.setItem("basket",JSON.stringify([...uptadeItem]))
                }
              }}>-</button>
              <button onClick={()=>{
                let currentItem=basket.find((x)=>x._id==basketItem._id);
                currentItem.count+=1;
                setBasket([...basket]);
                localStorage.setItem("basket",JSON.stringify([...basket]))
              }}>+</button>
              <button onClick={()=>{
                let uptadeItem=basket.filter((x)=>x._id!=basketItem._id);
                setBasket([...uptadeItem]);
                localStorage.setItem("basket",JSON.stringify([...uptadeItem]))
              }}>remove</button>
            </li>
          })}
        </ul>
        <button onClick={()=>{
          setBasket([]);
          localStorage.setItem("basket",JSON.stringify([]))
        }}>order</button>
    </div>
  )
}

export default Basket