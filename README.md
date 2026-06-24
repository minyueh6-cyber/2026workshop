# 2026 時間設計一日工作坊

GitHub repo：https://github.com/minyueh6-cyber/2026workshop

GitHub Pages 網址：https://minyueh6-cyber.github.io/2026workshop/

## 網站內容

- 活動標題：2026 時間設計一日工作坊
- 活動圖片：`cover.jpg`
- 活動流程與報名表單：`index.html`

## Google Sheet 設定

1. 建立一份 Google Sheet。
2. 第一列填入欄位：`timestamp`、`name`、`email`、`phone`、`organization`、`title`。
3. 開啟「擴充功能」中的 Apps Script。
4. 貼上下方程式碼並部署成 Web App。
5. Web App 存取權限選擇「任何人」。
6. 完成 OAuth 驗證後，把 Web App URL 填入網站報名表單的 Apps Script URL 欄位。

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || "",
      data.email || "",
      data.phone || "",
      data.organization || "",
      data.title || "",
    ]);

    return jsonOutput({ status: "ok" });
  } catch (error) {
    return jsonOutput({ status: "error", message: error.message });
  }
}

function doOptions() {
  return jsonOutput({ status: "ok" });
}

function jsonOutput(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
```

Apps Script 程式碼使用第一個工作表，不依賴 `Sheet1` 名稱。

## 部署到 GitHub Pages

網站已推送到 GitHub。若 Pages 尚未啟用，請到 repo 的 Settings > Pages，將來源設為 `main` 分支的根目錄。

```powershell
gh repo view minyueh6-cyber/2026workshop --web
```

本次部署未上傳 `spec` 資料夾。
