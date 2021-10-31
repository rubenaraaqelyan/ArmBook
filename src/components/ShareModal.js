import React from 'react';
import {
    EmailShareButton, EmailIcon,
    FacebookShareButton, FacebookIcon,
    TelegramShareButton, TelegramIcon,
    TwitterShareButton, TwitterIcon,
    WhatsappShareButton, WhatsappIcon,
    RedditShareButton, RedditIcon
} from 'react-share';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    between:{
        display:'flex',
        justifyContent:'space-between'
    }
}));

const ShareModal = ({url, theme}) => {
    const classes = useStyles()
    return (
        <div className={classes.between}
             style={{filter: theme ? 'invert(1)' : 'invert(0)' }}>
            <FacebookShareButton url={url} >
                <FacebookIcon round={true} size={32} />
            </FacebookShareButton>

            <TwitterShareButton url={url} >
                <TwitterIcon round={true} size={32} />
            </TwitterShareButton>

            <EmailShareButton url={url} >
                <EmailIcon round={true} size={32} />
            </EmailShareButton>

            <RedditShareButton url={url} >
                <RedditIcon round={true} size={32} />
            </RedditShareButton>

            <TelegramShareButton url={url} >
                <TelegramIcon round={true} size={32} />
            </TelegramShareButton>

            <WhatsappShareButton url={url} >
                <WhatsappIcon round={true} size={32} />
            </WhatsappShareButton>
        </div>
    )
}

ShareModal.propTypes = {
    url: PropTypes.string,
    theme: PropTypes.bool,
}

export default ShareModal
