const NodeMediaServer = require('node-media-server');

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
    ffmpeg: '/usr/bin/ffmpeg'  // Ensure this path is correct
  },
  http: {
    port: 8000,
    allow_origin: '*',
    mediaroot: './media',  // Ensure this directory exists or is created
    webroot: './www',      // Ensure this directory exists or is created
    api: true
  },
  trans: {
    ffmpeg: '/usr/bin/ffmpeg',  // Update this path to the correct location
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
  }
};

var nms = new NodeMediaServer(config);
nms.run();

console.log("RTMP server is running on port 80");
console.log("HTTP server is running on port 8000");

