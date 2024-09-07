const NodeMediaServer = require('node-media-server');

const config = {
  rtmp: {
    port: 8080,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8081,
    allow_origin: '*',
    mediaroot: './media',  // Ensure this directory exists
    webroot: './www',      // Ensure this directory exists
    api: true
  },
  trans: {
    ffmpeg: '/opt/homebrew/bin/ffmpeg',  // Ensure FFmpeg is installed and the path is correct
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

nms.run();

console.log("RTMP server is running on port 80");
console.log("HTTP server is running on port 8000");

