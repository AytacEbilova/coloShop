import React, { useContext, useState } from "react";
import styles from "../Home/home.module.scss";
import { useGetProductQuery } from "../../service/productApi";
import { Col, Row } from "antd";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { BasketContext } from "../../context/basketContext";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Button from "@mui/material/Button";
import { TextField, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import { FavContext } from "../../context/wishlistContext";
import FavoriteIcon from '@mui/icons-material/Favorite';

const Home = () => {
  const { data: products, refetch } = useGetProductQuery();
  const { basket, setBasket } = useContext(BasketContext);
  const{fav,setFav}=useContext(FavContext);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  let filteredData = products
    ? products.data.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  if (sort === "asc") {
    filteredData = filteredData.sort((a, b) => a.price - b.price);
  } else if (sort === "desc") {
    filteredData = filteredData.sort((a, b) => b.price - a.price);
  }

  const handleWishlist=(product)=>{
      const addToFav=fav.find((x)=>x._id==product._id);
      if(!addToFav){
        setFav([...fav,product]);
        localStorage.setItem("fav",JSON.stringify([...fav,product]));
      } else{
        const uptadeFav=fav.filter((x)=>x._id!=product._id);
        setFav(uptadeFav);
        localStorage.setItem("fav",JSON.stringify("fav",uptadeFav))
      }
  }
  return (
    <>
      <div className="application">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Aytac Shop Page</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
      </div>
      <section>
        <div className={styles.sect1}>
          <div className="container">
            <div className={styles.all}>
              <p>SPRING / SUMMER COLLECTION 2017</p>
              <h1>
                Get up to 30% Off <br /> New Arrivals
              </h1>
              <button>Shop Now</button>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.category}>
        <div className="container">
          <Row>
            <Col span={8} sm={24} lg={8} md={12}>
              <img
                src="https://preview.colorlib.com/theme/coloshop/images/banner_1.jpg"
                alt=""
              />
              <div className={styles.cat}>
                <p>WOMAN'S</p>
              </div>
            </Col>
            <Col span={8} sm={24} lg={8} md={12}>
              <img
                src="https://preview.colorlib.com/theme/coloshop/images/banner_2.jpg"
                alt=""
              />
              <div className={styles.cat}>
                <p>ACCESSORIES'S</p>
              </div>
            </Col>
            <Col span={8} sm={24} lg={8} md={12}>
              <img
                src="https://preview.colorlib.com/theme/coloshop/images/banner_3.jpg"
                alt=""
              />
              <div className={styles.cat}>
                <p>MEN'S</p>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      <section>
        <div className={styles.sect2}>
          <div className="container">
            <h2>New Arrivals</h2>
            <div className={styles.hr}></div>
            <TextField
              id="outlined-basic"
              label="Search Products"
              variant="outlined"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="sort-label">Sort</InputLabel>
              <Select
                labelId="sort-label"
                id="sort"
                value={sort}
                onChange={handleChange}
                label="Sort"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="asc">Price: Low to High</MenuItem>
                <MenuItem value="desc">Price: High to Low</MenuItem>
              </Select>
            </FormControl>
            <hr style={{ color: "red" }} />
            <Row
              gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
              }}
            >
              <div className={styles.cards}>
                {filteredData.map((product) => (
                  <Col
                    className="gutter-row"
                    span={6}
                    sm={24}
                    lg={8}
                    md={12}
                    key={product._id}
                  >
                    <div className={styles.card}>
                      <img src={product.img} alt="" />
                      <h3>{product.title}</h3>
                      <div className={styles.prices}>
                        <p>${product.price}</p>
                        <span>${product.discount}</span>
                      </div>
                      <div className={styles.button}>
                        <Button
                          onClick={() => {
                            let dublicateItem = basket.find(
                              (x) => x._id === product._id
                            );
                            if (dublicateItem) {
                              dublicateItem.count += 1;
                              setBasket([...basket]);
                              localStorage.setItem(
                                "basket",
                                JSON.stringify([...basket])
                              );
                            } else {
                              const newBasket = { ...product, count: 1 };
                              setBasket([...basket, newBasket]);
                              localStorage.setItem(
                                "basket",
                                JSON.stringify([...basket, newBasket])
                              );
                            }
                          }}
                        >
                          <ShoppingBasketIcon style={{ color: "black" }} />
                        </Button>
                        <button className={styles.detail}>
                          <Link
                            to={`detail/${product._id}`}
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            Detail
                          </Link>
                        </button>
                        <Button onClick={()=>handleWishlist(product)} style={{backgroundColor:"white",border:"1px solid black"}}>
                          <FavoriteIcon style={{color: fav.find((x)=>x._id===product._id) ? "red" :"inherit"}}/>
                        </Button>
                      </div>
                    </div>
                  </Col>
                ))}
              </div>
            </Row>
          </div>
        </div>
      </section>

      <section className={styles.sect3}>
        <div className="container">
          <h2
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "70px 0",
            }}
          >
            Best Sellers
          </h2>
          <div className={styles.hr}></div>
          <Row
            gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              lg: 32,
            }}
          >
            <Col className="gutter-row" span={6} xs={24} lg={8} md={12}>
              <img
                src="https://preview.colorlib.com/theme/coloshop/images/product_1.png"
                alt=""
              />
              <h4>Pocket cotton sweatshirt</h4>
              <p>$520.00</p>
            </Col>

            <Col className="gutter-row" span={6} xs={24} lg={8} md={12}>
              <img
                src="https://preview.colorlib.com/theme/coloshop/images/product_8.png"
                alt=""
              />
              <h4>Pocket cotton sweatshirt</h4>
              <p>$520.00</p>
            </Col>

            <Col className="gutter-row" span={6} xs={24} lg={8} md={12}>
              <img
                src="https://preview.colorlib.com/theme/coloshop/images/product_7.png"
                alt=""
              />
              <h4>Pocket cotton sweatshirt</h4>
              <p>$520.00</p>
            </Col>
            <Col className="gutter-row" span={6} xs={24} lg={8} md={12}>
              <img
                src="https://preview.colorlib.com/theme/coloshop/images/product_8.png"
                alt=""
              />
              <h4>Pocket cotton sweatshirt</h4>
              <p>$520.00</p>
            </Col>

            <Col className="gutter-row" span={6} xs={24} lg={8} md={12}>
              <img
                src="https://preview.colorlib.com/theme/coloshop/images/product_4.png"
                alt=""
              />
              <h4>Pocket cotton sweatshirt</h4>
              <p>$520.00</p>
            </Col>

            <Col className="gutter-row" span={6} xs={24} lg={8} md={12}>
              <img
                src="https://preview.colorlib.com/theme/coloshop/images/product_10.png"
                alt=""
              />
              <h4>Pocket cotton sweatshirt</h4>
              <p>$520.00</p>
            </Col>
          </Row>
        </div>
      </section>

      <section className={styles.sect4}>
        <div className="container">
          <h4>Latest Blogs</h4>
          <div className={styles.hr}></div>
          <Row
            gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              lg: 32,
            }}
          >
            <Col className="gutter-row" span={6} xs={24} lg={8} md={12}>
              <img
                src="https://preview.colorlib.com/theme/coloshop/images/blog_1.jpg"
                alt=""
              />
            </Col>

            <Col className="gutter-row" span={6} xs={24} lg={8} md={12}>
              <img
                src="https://preview.colorlib.com/theme/coloshop/images/blog_2.jpg"
                alt=""
              />
            </Col>

            <Col className="gutter-row" span={6} xs={24} lg={8} md={12}>
              <img
                src="https://preview.colorlib.com/theme/coloshop/images/blog_3.jpg"
                alt=""
              />
            </Col>
          </Row>
        </div>
      </section>

      <section className={styles.sect5}>
        <div className="container">
          <Row>
            <Col span={12}>
              <h4>NewsLetter</h4>
              <p>
                Subscribe to our newsletter and get 20% off your first purchase
              </p>
            </Col>
            <Col span={12}>
              <TextField
                id="outlined-basic"
                label="Your Email"
                variant="outlined"
              />
              <Button
                variant="contained"
                style={{
                  backgroundColor: "red",
                  height: "57px",
                  width: "200px",
                  padding: "10px 0",
                }}
              >
                Subscribe
              </Button>
            </Col>
          </Row>
        </div>
      </section>

      <footer>
        <div className="container">
          <Row>
            <Col span={12}>
              <ul>
                <li>Blog</li>
                <li>FAQs</li>
                <li>Contact Us</li>
              </ul>
            </Col>
            <Col span={12}>
              <FacebookIcon />
              <TwitterIcon />
              <PinterestIcon />
              <InstagramIcon />
            </Col>
          </Row>
        </div>
      </footer>
    </>
  );
};

export default Home;
