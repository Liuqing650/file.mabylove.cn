// cdn.js
import config from './config'

const cdn =  {
  img:config.host+'/upload/uploadImage',
  file:config.host+'/upload/uploadFile',
  music:config.host+'/upload/uploadMusic',
  voice:config.host+'/upload/uploadVoice',
  video:config.host+'/upload/uploadVideo',
  res:config.host+'/upload/uploadRes',
};

export default cdn;