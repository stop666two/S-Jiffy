'use strict';
// Stops the dev server started by server.js, using the PID recorded in .server.pid.
//
// Safety: a PID file can be stale, and PIDs get recycled. Killing a recycled PID
// would terminate an unrelated process, so the process command line must mention
// server.js before anything is killed. If the command line cannot be read, we
// only drop the PID file and leave the process alone.

var fs = require('fs');
var path = require('path');
var child_process = require('child_process');

var pidFile = path.join(__dirname, '..', '.server.pid');

function isOurServer(pid) {
  if (!pid || pid === process.pid) return false;
  var cmdline = '';
  try {
    cmdline = fs.readFileSync('/proc/' + pid + '/cmdline', 'utf8').replace(/\0/g, ' ');
  } catch (e) {
    if (process.platform !== 'win32') return false;
    try {
      cmdline = child_process.execFileSync(
        'wmic',
        ['process', 'where', 'processid=' + pid, 'get', 'commandline', '/format:list'],
        { encoding: 'utf8', timeout: 5000, windowsHide: true }
      );
    } catch (e2) {
      return false;
    }
  }
  return cmdline.indexOf('server.js') !== -1;
}

var pid = 0;
try {
  pid = parseInt(fs.readFileSync(pidFile, 'utf8').trim(), 10);
} catch (e) {
  console.log('no pid file');
  process.exit(0);
}

if (isOurServer(pid)) {
  try { process.kill(pid); console.log('stopped pid ' + pid); } catch (e) { console.log('pid ' + pid + ' already gone'); }
} else {
  console.log('pid ' + pid + ' is not our server.js; left it alone');
}
try { fs.unlinkSync(pidFile); } catch (e) {}
