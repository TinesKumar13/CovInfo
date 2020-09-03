import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography,CardActionArea,CardMedia } from "@material-ui/core";
import { makeStyles, withStyles } from '@material-ui/core/styles';   
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import "./Api.css"






    const useStyles = makeStyles({
        root: {
          maxWidth: 300,
        
          
        },
      });

      const StyledButton = withStyles({
        root: {
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          borderRadius: 3,
          border: 0,
          color: 'white',
          height: 48,
          padding: '0 30px',
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        },
        label: {
          textTransform: 'capitalize',
        },
      })(Button);
    
function News({title, description, image, url}) {

    const classes = useStyles();
    
    return (

        <div className="position__News">
        <Card className={classes.root}>

        <CardActionArea>
          <CardMedia
            component="img"
            alt="No Image Available"
            height="140"
            image={image}
            
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>

     <StyledButton href={url}>See News</StyledButton>
     
      </CardActions>
      
      </Card>

      </div>
     
        

            
    )
}

export default News
