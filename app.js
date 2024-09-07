const NodeMediaServer = require('node-media-server');

const config = {
  rtmp: {
    port: 80,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
    ffmpeg: '/usr/bin/ffmpeg'  // Update this path if necessary
  },
  http: {
    port: 80,  // Same port as RTMP
    allow_origin: '*',
    mediaroot: './media',
    webroot: './www',
    api: false  // Disable HTTP API if not needed
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
    api: false,  // Disable API authentication if not needed
    play: false,
    publish: true,
    secret: 'bezaitis_experiment'  // Stream key
  }
};

var nms = new NodeMediaServer(config);

nms.on('prePublish', (id, StreamPath, args) => {
  let streamKey = getStreamKeyFromStreamPath(StreamPath);
  console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);

  if (streamKey !== 'bezaitis_experiment') {
    console.log('[NodeEvent on prePublish] Stream key is invalid');
    nms.getSession(id).reject();
  }
});

const getStreamKeyFromStreamPath = (path) => {
  let parts = path.split('/');
  return parts[parts.length - 1];
};

nms.run();

console.log("RTMP server is running on port 80");

