import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Actions } from '../../states/CustomFlexPlayerState';
import CustomFlexPlayer from './CustomFlexPlayer';

const mapStateToProps = (state) => ({
  isOpen: state['flex-custom-insights-player'].customFlexPlayer.isOpen,
  mediaUrl: state['flex-custom-insights-player'].customFlexPlayer.mediaUrl,
});

const mapDispatchToProps = (dispatch) => ({
  dismissCustomFlexPlayer: bindActionCreators(Actions.dismissCustomFlexPlayer, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomFlexPlayer);
