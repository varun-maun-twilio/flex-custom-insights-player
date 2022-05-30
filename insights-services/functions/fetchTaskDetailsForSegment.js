const axios = require('axios').default;

/* TODO: Enhance the following to cache the tokens in sync */
async function fetchYticaToken(flexToken,accountSid) {

  return axios.post('https://apigw.ytica.com/provisioning/token-generator',
  {"token":flexToken,"account_sid":accountSid}).then(d=>d.data.authorization_token)


} 


async function fetchInsightsConversationDetails(segmentId,yticaToken){
  return axios.get(`https://app.ytica.com/media/conversation?segment_id=${segmentId}`,{headers:{
    'accept': 'application/json', 
    'authorization': `Bearer ${yticaToken}`
  }}).then(d=>d.data);
}

async function fetchInsightsSegmentMediaDetails(segmentId,yticaToken){
  return axios.get(`https://app.ytica.com/media/data/${segmentId}`,{headers:{
    'accept': 'application/json', 
    'authorization': `Bearer ${yticaToken}`
  }}).then(d=>d.data);
}


exports.handler = async function(context, event, callback) {
  const response = new Twilio.Response();
    response.appendHeader('Access-Control-Allow-Origin', '*');
    response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS POST GET');
    response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');
    response.appendHeader('Content-Type', 'application/json');

    const accountSid = context.ACCOUNT_SID;

    const flexToken = event.flexToken ;
    const yticaToken = await fetchYticaToken(flexToken,accountSid);

    const segmentId = event.segmentId;

  
    const segmentMedia = await fetchInsightsSegmentMediaDetails(segmentId,yticaToken)



  response.setBody(segmentMedia);     
  return callback(null, response);
};
