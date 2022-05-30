import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from '@twilio/flex-plugin';
import {Actions as FlexPlayerActions} from './states/CustomFlexPlayerState';
import CustomFlexPlayerContainer from './components/CustomFlexPlayer/CustomFlexPlayer.Container';
import reducers, { namespace } from './states';


import { InsightsService } from '@twilio/flex-ui';



const PLUGIN_NAME = 'FlexCustomInsightsPlayerPlugin';

export default class FlexCustomInsightsPlayerPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  async init(flex, manager) {
    this.registerReducers(manager);


    flex.MainContainer.Content.add(<CustomFlexPlayerContainer key="custom-flex-player" />)


flex.Actions.replaceAction("InsightsPlayer:play",async (payload)=>{


const mediaContent = await fetch(process.env.REACT_APP_SERVICE_BASE_URL+'/fetchTaskDetailsForSegment',{
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    segmentId:payload.segmentId,
    flexToken: manager.store.getState().flex.session.ssoTokenPayload.token
  })
}).then(d=>d.json()).catch(e=>{});

let mediaUrl = null;

try{
  mediaUrl = mediaContent.metadata.media.filter(x=>x.type === "VoiceRecording")[0].url;
}catch(e){
 
}

manager.store.dispatch(FlexPlayerActions.openCustomFlexPlayer(mediaUrl))



  


});

  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint-disable-next-line
      console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`);
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
