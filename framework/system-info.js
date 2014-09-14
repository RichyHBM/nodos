var os = require('os');

var fullInfo = {};

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

fullInfo.bytesToMega = function(val){
  return val / 1000 / 1000;
}

fullInfo.getSystemInfo = function()
{    
  var info = {};
  
  info.endianness = os.endianness() == "BE" ? "Big Endian" : "Little Endian";
  info.hostname = os.hostname();
  info.osname = os.type();
  info.architecture = os.arch();
  info.uptime = os.uptime();
  info.totalmemory = fullInfo.bytesToMega( os.totalmem() );
  info.freememory = fullInfo.bytesToMega( os.freemem() );
  info.cpus = fullInfo.getCPUInfo();

  return info;
}

module.exports = fullInfo;