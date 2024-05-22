import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useGetOneProductQuery } from "../../service/productApi";
import { useNavigate, useParams } from "react-router-dom";
const Detail = () => {
    const{id}=useParams();
    const navigate=useNavigate()
    const{data:product}=useGetOneProductQuery(id)
    console.log(product)
  return (
    <div>
        {product && (
              <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 140 }}
                image={product?.data.img}
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                 {product?.data.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product?.data.price}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={()=>navigate(-1)}>Go Back</Button>
             
              </CardActions>
            </Card>
        )}
    
    </div>
  );
};

export default Detail;
