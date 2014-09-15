var os = require('os');

var fullInfo = {};

var isWindows = process.platform === 'win32';

fullInfo.getRawInfo = function()
{    
  var info = {};
  
  info.endianness = os.endianness();
  info.hostname = os.hostname();
  info.osname = os.type();
  info.platform = os.platform();
  info.architecture = os.arch();
  info.release = os.release();
  info.uptime = os.uptime();
  info.loadaverage = os.loadavg();
  info.totalmemory = os.totalmem();
  info.freememory = os.freemem();
  info.cpus = os.cpus();
  info.network = os.networkInterfaces();

  return info;
}

fullInfo.getCPUInfo = function(){
  return os.cpus();
}

module.exports = fullInfo;