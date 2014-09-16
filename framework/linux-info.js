var shell = require('shelljs');

var EOL = require('os').EOL;

var linuxInfo = {};

linuxInfo.callCmd = function(cmd)
{
  var exec = shell.exec(cmd, {silent: true});
  if(exec.code !== 0) {
    return 'N/A';
  }
  return exec.output;
}

linuxInfo.processCount = function()
{
  return linuxInfo.callCmd("ps axc | wc -l").replace(EOL, "");
}

linuxInfo.processes = function()
{
  var processStr = linuxInfo.callCmd("ps axc -o uname:12,pcpu,rss,cmd --sort=-pcpu,-rss --noheaders --width 120");
  var processArray = processStr.split(require('os').EOL);
  var processes = [];
  for(var i = 0; i < processArray.length; i++)
  {
    var processInfo = processArray[i].split(' ');
    processInfo = processInfo.filter( 
        function(el) { 
            return el !== '';
        });

    if(processInfo.length !== 4) 
        continue;

    var process = {};
    process.user = processInfo[0].trim();
    process.cpu = processInfo[1].trim();
    process.pid = processInfo[2].trim();
    process.name = processInfo[3].trim();
    processes.push(process);
  }
  return processes;
}


linuxInfo.sessionCount = function()
{
  return linuxInfo.callCmd("who | wc -l").replace(EOL, "");
}

linuxInfo.fileHandles = function()
{
  return linuxInfo.callCmd("cat /proc/sys/fs/file-nr | awk '{ print $1 }'").replace(EOL, "");
}

linuxInfo.fileHandlesLimit = function()
{
  return linuxInfo.callCmd("cat /proc/sys/fs/file-nr | awk '{ print $3 }'").replace(EOL, "");
}

linuxInfo.ramTotal = function()
{
    return linuxInfo.callCmd("cat /proc/meminfo | grep ^MemTotal: | awk '{ print $2 }'").replace(EOL, "");
}

linuxInfo.ramFree = function()
{
    return linuxInfo.callCmd("cat /proc/meminfo | grep ^MemFree: | awk '{ print $2 }'").replace(EOL, "");
}

linuxInfo.ramCached = function()
{
    return linuxInfo.callCmd("cat /proc/meminfo | grep ^Cached: | awk '{ print $2 }'").replace(EOL, "");
}

linuxInfo.ramBuffers = function()
{
    return linuxInfo.callCmd("cat /proc/meminfo | grep ^Buffers: | awk '{ print $2 }'").replace(EOL, "");
}

linuxInfo.swapTotal = function()
{
  return linuxInfo.callCmd("cat /proc/meminfo | grep ^SwapTotal: | awk '{ print $2 }'").replace(EOL, "");
}

linuxInfo.swapFree = function()
{
  return linuxInfo.callCmd("cat /proc/meminfo | grep ^SwapFree: | awk '{ print $2 }'").replace(EOL, "");
}

linuxInfo.diskTotal = function()
{
  return linuxInfo.callCmd("df -P -B 1 | grep '^/' | awk '{ print $2 }'").replace(EOL, "");
}

linuxInfo.diskUsage = function()
{
  return linuxInfo.callCmd("df -P -B 1 | grep '^/' | awk '{ print $3 }'").replace(EOL, "");
}

linuxInfo.activeConnections = function()
{
  if (shell.which("ss"))
    return linuxInfo.callCmd("ss -tun | tail -n +2 | wc -l").replace(EOL, "");
  else
    return linuxInfo.callCmd("netstat -tun | tail -n +3 | wc -l").replace(EOL, "");
}

linuxInfo.getAll = function(){
  var info = {};

  info.processCount = linuxInfo.processCount();
  info.processes = linuxInfo.processes();
  info.sessionCount = linuxInfo.sessionCount();
  
  info.fileHandles = linuxInfo.fileHandles();
  info.fileHandlesLimit = linuxInfo.fileHandlesLimit();

  info.ramTotal = linuxInfo.ramTotal();
  info.ramFree = linuxInfo.ramFree();
  info.ramCached = linuxInfo.ramCached();
  info.ramBuffers = linuxInfo.ramBuffers();

  info.swapTotal = linuxInfo.swapTotal();
  info.swapFree = linuxInfo.swapFree();
  info.diskTotal = linuxInfo.diskTotal();
  info.diskUsage = linuxInfo.diskUsage();

  info.ramTotalMB = Math.round(info.ramTotal / 1000 / 1000);
  info.ramFreeMB = Math.round(info.ramFree / 1000 / 1000);
  info.ramCachedMB = Math.round(info.ramCached / 1000 / 1000);
  info.ramBuffersMB = Math.round(info.ramBuffers / 1000 / 1000);

  info.swapTotalMB = Math.round(info.swapTotal / 1000 / 1000);
  info.swapFreeMB = Math.round(info.swapFree / 1000 / 1000);
  info.diskTotalMB = Math.round(info.diskTotal / 1000 / 1000);
  info.diskUsageMB = Math.round(info.diskUsage / 1000 / 1000);

  info.activeConnections = linuxInfo.activeConnections();

  return info;
}

module.exports = linuxInfo;