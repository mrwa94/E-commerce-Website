import { Product } from '../../redux/slices/products/productSlice'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

import { MdOutlineFavorite } from 'react-icons/md'
import { PiShoppingCartSimpleFill } from 'react-icons/pi'
import { Link } from 'react-router-dom'

const CardProducts = (props: Product) => {
  return (
    <Card sx={{ maxWidth: 300, padding: 1, margin: 2 }}>
      <Link to={`/Product/${props.id}`}>
        <CardMedia sx={{ maxHeight: 200 }} component="img" alt={props.name} image={props.image} />

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
        </CardContent>
      </Link>
      <CardActions className="sm:gap-24 lg:gap-36">
        <div>
          <button className=" text-2xl">
            <MdOutlineFavorite className="mx-1 lg:mx-2" color="#be123c" />
          </button>
          <button className="text-2xl">
            <PiShoppingCartSimpleFill />
          </button>
        </div>
        <Typography gutterBottom variant="body2" component="div">
          {props.price}
        </Typography>
      </CardActions>
    </Card>
  )
}

export default CardProducts
