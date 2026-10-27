/**
 * =========================================================================
 * 💍 Sanjana & Rahul Wedding RSVP - Google Apps Script
 * =========================================================================
 * This script connects your Wedding Invitation RSVP form directly to a
 * Google Sheet in your Google Drive (which can be exported to Excel anytime).
 *
 * 📋 3-MINUTE SETUP INSTRUCTIONS:
 * 1. Open Google Sheets (https://sheets.google.com) and create a New Spreadsheet.
 * 2. Name your spreadsheet: "Sanjana & Rahul Wedding RSVPs"
 * 3. In the top menu, click: Extensions -> Apps Script
 * 4. Delete any code in the editor, paste this entire script, and click Save (💾).
 * 5. In the top right, click: Deploy -> New deployment
 * 6. Click the gear icon (⚙️) next to 'Select type' and choose: Web app
 * 7. Set:
 *    - Description: "Wedding RSVP Handler"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone" (IMPORTANT: so guests can submit without signing in)
 * 8. Click 'Deploy' and copy the 'Web app URL' (looks like: https://script.google.com/macros/s/.../exec).
 * 9. Paste this URL into index.html in the data-google-script-url attribute or in js/rsvp-form.js.
 * =========================================================================
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getActiveSheet();

    // Initialize headers if empty
    if (sheet.getLastRow() === 0) {
      var headers = [
        "Timestamp",
        "Guest Name",
        "Email Address",
        "Phone / Contact",
        "Number of People",
        "Events / Occasions Attending",
        "Blessings & Notes"
      ];
      sheet.appendRow(headers);

      // Style header row with Royal Maroon & Gold theme
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#8b3a4b");
      headerRange.setFontColor("#ffffff");
      headerRange.setFontFamily("Arial");
      sheet.setFrozenRows(1);
    }

    var data;
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter;
      }
    } else {
      data = e.parameter;
    }

    var row = [
      new Date(),
      data.name || "",
      data.email || "",
      data.phone || "",
      data.guests || "1",
      data.occasions || "",
      data.message || ""
    ];

    sheet.appendRow(row);

    // Auto-fit columns for easy readability
    for (var col = 1; col <= 7; col++) {
      sheet.autoResizeColumn(col);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ "result": "success", "row": sheet.getLastRow() }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ "status": "active", "message": "Sanjana & Rahul Wedding RSVP service is running." }))
    .setMimeType(ContentService.MimeType.JSON);
}
