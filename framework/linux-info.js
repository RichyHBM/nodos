var shell = require('shelljs');

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
  return linuxInfo.callCmd("ps axc | wc -l");
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
  return linuxInfo.callCmd("who | wc -l");
}

linuxInfo.fileHandles = function()
{
  return linuxInfo.callCmd("cat /proc/sys/fs/file-nr | awk '{ print $1 }'");
}

linuxInfo.fileHandlesLimit = function()
{
  return linuxInfo.callCmd("cat /proc/sys/fs/file-nr | awk '{ print $3 }'");
}

linuxInfo.ramTotal = function()
{
    return linuxInfo.callCmd("cat /proc/meminfo | grep ^MemTotal: | awk '{ print $2 }'");
}

linuxInfo.ramFree = function()
{
    return linuxInfo.callCmd("cat /proc/meminfo | grep ^MemFree: | awk '{ print $2 }'");
}

linuxInfo.ramCached = function()
{
    return linuxInfo.callCmd("cat /proc/meminfo | grep ^Cached: | awk '{ print $2 }'");
}

linuxInfo.ramBuffers = function()
{
    return linuxInfo.callCmd("cat /proc/meminfo | grep ^Buffers: | awk '{ print $2 }'");
}

linuxInfo.swapTotal = function()
{
  return linuxInfo.callCmd("cat /proc/meminfo | grep ^SwapTotal: | awk '{ print $2 }'");
}

linuxInfo.swapFree = function()
{
  return linuxInfo.callCmd("cat /proc/meminfo | grep ^SwapFree: | awk '{ print $2 }'");
}

linuxInfo.diskTotal = function()
{
  return linuxInfo.callCmd("df -P -B 1 | grep '^/' | awk '{ print $2 }' | sed -e :a -e '$!N;s/\n/+/;ta'");
}

linuxInfo.diskUsage = function()
{
  return linuxInfo.callCmd("df -P -B 1 | grep '^/' | awk '{ print $3 }' | sed -e :a -e '$!N;s/\n/+/;ta'");
}

linuxInfo.activeConnections = function()
{
  if (shell.which("ss"))
    return linuxInfo.callCmd("ss -tun | tail -n +2 | wc -l");
  else
    return linuxInfo.callCmd("netstat -tun | tail -n +3 | wc -l");
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
  info.activeConnections = linuxInfo.activeConnections();

  return info;
}

module.exports = linuxInfo;