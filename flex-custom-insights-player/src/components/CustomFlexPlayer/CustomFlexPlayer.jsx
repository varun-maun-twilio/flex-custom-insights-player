import React from 'react';
import PropTypes from 'prop-types';

import './styles.css'

// It is recommended to keep components stateless and use redux for managing states
const CustomFlexPlayer = (props) => {
  if (!props.isOpen) {
    return null;
  }

  return (
    <div className="custom-flex-player-wrapper">
      

    <div className="custom-flex-player-audio-player">

    {
      props.mediaUrl &&
      <audio controls>
      <source src={props.mediaUrl} type="audio/mpeg" />
    </audio>
    }

    {
      !props.mediaUrl &&
      <h3 className="custom-flex-player-no-record">No Recording Found</h3>
    }


 

    <div className="custom-flex-player-dismiss-btn">
    <i className="accented" onClick={props.dismissCustomFlexPlayer} aria-hidden="true">
        X
      </i>
</div>

    </div>
   



      
    </div>
  );
};

CustomFlexPlayer.displayName = 'CustomFlexPlayer';

CustomFlexPlayer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  mediaUrl: PropTypes.string.isRequired,
  dismissBar: PropTypes.func.isRequired,
};

export default CustomFlexPlayer;
