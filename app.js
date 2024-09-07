const NodeMediaServer = require('node-media-server');

const config = {
  rtmp: {
    port: 80,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
    ffmpeg: '/usr/bin/ffmpeg'
  },
  http: {
    port: 8000,
    allow_origin: '*',
    mediaroot: './media',
    webroot: './www',
    api: true
  },
  trans: {
    ffmpeg: '/usr/bin/ffmpeg',
    tasks: [
      {
        app: 'live',
        vc: 'libx264',
        vcParams: ['-preset', 'veryfast', '-tune', 'zerolatency'],
        ac: 'aac',
        acParams: ['-b:a', '128k', '-ar', '44100'],
        hls: true,
        hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
        dash: true
      }
    ]
  },
  auth: {
    api : true,
    play: false,
    publish: true,  // Enable stream key authentication for publishing
    secret: 'bezaitis_experiment'  // You can set any string here for stream key validation
  }
};

var nms = new NodeMediaServer(config);

nms.on('prePublish', (id, StreamPath, args) => {
  let streamKey = getStreamKeyFromStreamPath(StreamPath);
  console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);

  // Validate stream key
  if (streamKey !== 'bezaitis_experiment') {  // Set your preferred stream key here
    console.log('[NodeEvent on prePublish] Stream key is invalid');
    nms.getSession(id).reject();
  }
});

const getStreamKeyFromStreamPath = (path) => {
  let parts = path.split('/');
  return parts[parts.length - 1];
};

nms.run();
