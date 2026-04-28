/**
 * Google Sheets CSV 連携モジュール
 *
 * ■ スプレッドシートの準備手順
 * 1. Google スプレッドシートを新規作成する
 * 2. 1行目に以下のヘッダーをこの順番で入力する:
 *      id | title | date | tags | image_url | description
 *    ※各列の説明は下記「列の説明」を参照
 * 3. [ファイル] → [共有] → [ウェブに公開] を開く
 * 4. 「リンク」タブで「シート1」「カンマ区切りの値(.csv)」を選び「公開」をクリック
 * 5. 表示されたURLから SPREADSHEET_ID 部分を取得し、下記の定数に貼り付ける
 *    （URL例: https://docs.google.com/spreadsheets/d/【ここがID】/pub?...）
 *
 * ■ 列の説明
 *  id          : URLに使う一意のID。半角英数字・ハイフン・アンダーバーのみ使用可
 *                （例: kamiiikebukuro-house, supertightcity）
 *  title       : プロジェクトタイトル（例: 上池袋の住宅）
 *  date        : 日付（例: 202503 または 20250315）
 *  tags        : カテゴリ。Design / Research / Thesis / Reading / Publication / Event から1つ
 *  image_url   : Flickr などの画像直URLを貼り付ける
 *                （例: https://live.staticflickr.com/65535/xxxxx_xxxxx_b.jpg）
 *  description : プロジェクト説明文。Ctrl+Enter で改行すると段落分けされる
 */

// ============================================================
// ★ 「ウェブに公開」で取得した CSV の URL をここに貼り付けてください ★
// ============================================================
const SHEETS_CSV_URL =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vRc38sAfkwC3DqFjfMSeVpZVN5HMdmAC3vXiwhNW7IBw5C1MOZV8Lr3n2Bi8WLzx9BZYGvMb-vGkIM9/pub?output=csv';

/**
 * スプレッドシートからプロジェクト一覧を取得してパースする
 * @returns {Promise<Array<{id, title, date, tags, image_url, description}>>}
 */
async function fetchProjects() {
    const response = await fetch(SHEETS_CSV_URL);
    if (!response.ok) {
        throw new Error(`スプレッドシートの取得に失敗しました (HTTP ${response.status})`);
    }
    const csvText = await response.text();
    return parseCSV(csvText);
}

/**
 * CSVテキストをオブジェクト配列に変換する（1行目をヘッダーとして使用）
 * @param {string} csvText
 * @returns {Array<Object>}
 */
function parseCSV(csvText) {
    const lines = splitIntoLogicalLines(csvText);
    if (lines.length < 2) return [];

    const headers = parseFields(lines[0]).map(h => h.trim());

    return lines.slice(1)
        .map(line => parseFields(line))
        .filter(fields => fields.some(f => f.trim()))
        .map(fields => {
            const project = {};
            headers.forEach((header, i) => {
                project[header] = (fields[i] || '').trim();
            });
            return project;
        })
        .filter(p => p.id && p.title)           // id と title は必須
        .filter(p => p.published !== 'FALSE'); // published 列が FALSE のものは非表示
}

/**
 * CSVテキスト全体を「論理行」に分割する
 * セル内改行（ダブルクォートで囲まれた中の改行）は行の区切りとして扱わない
 * @param {string} text
 * @returns {Array<string>}
 */
function splitIntoLogicalLines(text) {
    const lines = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
        const ch = text[i];

        if (ch === '"') {
            if (inQuotes && text[i + 1] === '"') {
                // エスケープされたダブルクォート（"" → "）
                current += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
                current += ch; // クォート文字はそのまま残す（parseFields で除去）
            }
        } else if (ch === '\r' && text[i + 1] === '\n' && !inQuotes) {
            lines.push(current);
            current = '';
            i++; // \r\n を1セットとして処理
        } else if (ch === '\n' && !inQuotes) {
            lines.push(current);
            current = '';
        } else {
            current += ch;
        }
    }
    if (current.trim()) lines.push(current);
    return lines;
}

/**
 * CSV の1論理行をフィールド配列に分割する（ダブルクォート・セル内改行対応）
 * @param {string} line
 * @returns {Array<string>}
 */
function parseFields(line) {
    const fields = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const ch = line[i];

        if (ch === '"') {
            if (inQuotes && line[i + 1] === '"') {
                current += '"';
                i++;
            } else {
                inQuotes = !inQuotes; // クォートは current に追加しない（外側のクォートを除去）
            }
        } else if (ch === ',' && !inQuotes) {
            fields.push(current);
            current = '';
        } else {
            current += ch;
        }
    }
    fields.push(current);
    return fields;
}
