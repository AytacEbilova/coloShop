
import { Link } from "react-router-dom"
import styles from "../Header/header.module.scss"
import { useContext } from "react"
import { BasketContext } from "../../context/basketContext"
import { FavContext } from "../../context/wishlistContext"
const Header = () => {
    const{basket}=useContext(BasketContext);
    const{fav}=useContext(FavContext);
  return (
    <div>
        <header>
            <div className="container">
                <div className={styles.all}>
                    <div className={styles.logo}>
                    COLOSHOP
                    </div>
              
                <div className={styles.right}>
                    <ul>
                        <li>
                            <Link className={styles.link} to={"/"}>Home</Link>
                        </li>
                        <li>
                            <Link className={styles.link} to={"add"}>Add</Link>
                        </li>
                        <li>
                            <Link className={styles.link} to={"basket"}>Basket <sub>{basket.length}</sub></Link>
                        </li>
                        <li>
                            <Link className={styles.link} to={"basket"}>Wishlist <sub>{fav.length}</sub></Link>
                        </li>
                    </ul>
                </div>
                </div>
            </div>
        </header>
    </div>
  )
}

export default Header