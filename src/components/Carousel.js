import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';

const Carousel = ({images, id}) => {
    const isActive = index => {
        if(index === 0) return "active";
    }

    const { theme } = useSelector(state => state)

    return (
        <Grid container id={`image${id}`} className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators" style={{zIndex: 1}}>
                { images.map((img, index) => (
                        <li key={index} data-target={`#image${id}`}
                            data-slide-to={index} className={isActive(index)} />
                    )) }
            </ol>
            <Grid className="carousel-inner">
                {
                    images.map((img, index) => (
                        <div key={index} className={`carousel-item ${isActive(index)}`}>
                            {
                                img.url.match(/video/i)
                                    ? <video controls src={img.url}
                                             style={{filter: theme ? 'invert(1)' : 'invert(0)'}} />

                                    : <img src={img.url} alt={img.url}
                                           style={{filter: theme ? 'invert(1)' : 'invert(0)'}} />
                            }

                        </div>
                    ))
                }

            </Grid>

            { images.length > 1 &&
                <>
                    <a className="carousel-control-prev" href={`#image${id}`} role="button" data-slide="prev"
                       style={{width: '5%'}}>
                        <span className="carousel-control-prev-icon" aria-hidden="true"/>
                        <span className="sr-only">Previous</span>
                    </a>

                    <a className="carousel-control-next" href={`#image${id}`} role="button" data-slide="next"
                       style={{width: '5%'}}>
                        <span className="carousel-control-next-icon" aria-hidden="true"/>
                        <span className="sr-only">Next</span>
                    </a>
                </> }
        </Grid>
    )
}

export default Carousel;
