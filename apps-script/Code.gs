// Study Desk registration endpoint: saves name, class and roll into the Google Sheet this script is attached to.
var SHEET_NAME = 'Students';

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    var d = JSON.parse(e.postData.contents);
    var name = clean(d.name, 60), cls = clean(d.cls, 40), roll = clean(d.roll, 12), ver = clean(d.v, 10);
    if (d.app !== 'studydesk' || !name || !cls || !roll) return out('invalid');
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sh.getLastRow() === 0) sh.appendRow(['Last updated', 'Name', 'Class', 'Roll', 'App version', 'First registered']);
    var key = (cls + '|' + roll).toLowerCase(), rows = sh.getDataRange().getValues(), now = new Date();
    for (var i = 1; i < rows.length; i++) {
      if ((String(rows[i][2]) + '|' + String(rows[i][3])).toLowerCase() === key) {
        sh.getRange(i + 1, 1, 1, 5).setValues([[now, name, cls, roll, ver]]);
        return out('updated');
      }
    }
    sh.appendRow([now, name, cls, roll, ver, now]);
    return out('ok');
  } catch (err) {
    return out('error');
  } finally {
    try { lock.releaseLock(); } catch (e2) {}
  }
}

function clean(v, max) {
  var s = String(v == null ? '' : v).replace(/[\r\n\t]+/g, ' ').trim().slice(0, max);
  return /^[=+\-@]/.test(s) ? "'" + s : s;   // stops spreadsheet formulas
}
function out(text) { return ContentService.createTextOutput(text); }
function doGet() { return out('Study Desk registration endpoint is running.'); }
