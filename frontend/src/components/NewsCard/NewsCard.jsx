import React from 'react'
import "./newscard.css"
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const NewsCard = ({title,url,image,more}) => {
  return (
        <Card className='stockify__newscard'>
            <CardMedia className='stockify__newscard-img' component="img" src={image} alt='img' />
            <CardContent sx={{padding:"0 4px"}}>
                <Typography className='stockify__newscard-heading' variant="p" component="div">
                    {title.slice(0,62)}...
                </Typography>
                <Button onClick={(e)=>window.open(url, '_blank')} sx={{width:"100%",display:"flex",alignContent:"flex-end",flexDirection:"column"}} className='stockify__newscard-btn'>{more}</Button>
            </CardContent>
        </Card>
  )
}

export default NewsCard