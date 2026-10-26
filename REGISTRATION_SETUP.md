# Registration setup (name, class, roll into a Google Sheet)

The app asks each new user for name, class and roll (they must tick a box to agree, or they can skip).
The details go to a Google Sheet that only you can open.

1. Go to sheets.google.com and create a sheet named "Study Desk Students".
2. In the sheet: Extensions > Apps Script. Delete the sample code and paste all of apps-script/Code.gs. Save.
3. Click Deploy > New deployment > type: Web app.
   - Execute as: Me
   - Who has access: Anyone
   Click Deploy and allow the permissions. Copy the Web app URL (it ends with /exec).
4. Open www/config.js and paste the URL between the quotes:  registerUrl: 'https://script.google.com/macros/s/.../exec'
5. Run: npm run sync   then rebuild the APK.
6. Test: install the APK on your phone, register, and check that a row appears in the "Students" tab.

Notes
- If you change Code.gs later, use Deploy > Manage deployments > Edit > New version, or the app keeps using the old code.
- The URL is inside the APK, so anyone can extract it and send fake entries. Treat the sheet as unverified.
- The app can only tell that the request left the phone, not that the sheet saved it. Always check the sheet.
- Keep the sheet private. Tell students what is collected, and delete a row when someone asks.
- Entries are matched on class + roll, so registering again updates the same row.
