import subprocess
import json
import re
import os

script_dir = os.path.dirname(os.path.abspath(__file__))
log_lines = []

# yt-dlp -J でプレイリスト全体をJSONとしてstdoutに出力
result = subprocess.run(
    ["python", "-m", "yt_dlp", "--flat-playlist", "-J",
     "https://www.youtube.com/@okasyoukai2/videos"],
    capture_output=True
)

data = json.loads(result.stdout.decode("utf-8"))
entries = data.get("entries", [])
log_lines.append(f"Total videos fetched: {len(entries)}")

# 【風XX】パターンにマッチする動画を年別に分類
year_map = {}

for entry in entries:
    video_id = entry.get("id", "")
    title = entry.get("title", "")

    # 全角数字 【風２６】 パターン
    m = re.search(r'【風([０-９]{2})】', title)
    if not m:
        # 半角数字 【風26】 パターン
        m = re.search(r'【風(\d{2})】', title)
        if not m:
            continue
        yy = int(m.group(1))
    else:
        hankaku = m.group(1).translate(str.maketrans('０１２３４５６７８９', '0123456789'))
        yy = int(hankaku)

    yyyy = 2000 + yy
    item = {
        "title": title,
        "embedUrl": f"https://www.youtube.com/embed/{video_id}"
    }
    year_map.setdefault(yyyy, []).append(item)

matched = sum(len(v) for v in year_map.values())
log_lines.append(f"Matched videos: {matched}")
for yr, items in sorted(year_map.items()):
    log_lines.append(f"  {yr}: {len(items)} videos")

# 各年のJSONファイルに保存
for year, items in sorted(year_map.items()):
    filepath = os.path.join(script_dir, f"video_{year}.json")
    existing = []
    if os.path.exists(filepath):
        with open(filepath, "r", encoding="utf-8") as f:
            try:
                existing = json.load(f)
            except json.JSONDecodeError:
                existing = []
    existing_urls = {e["embedUrl"] for e in existing}
    added = 0
    for item in items:
        if item["embedUrl"] not in existing_urls:
            existing.append(item)
            added += 1
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(existing, f, ensure_ascii=False, indent=2)
    log_lines.append(f"video_{year}.json: added={added}, total={len(existing)}")

log_lines.append("Done.")

# ログをファイルに書き出す
log_path = os.path.join(script_dir, "_fetch_log.txt")
with open(log_path, "w", encoding="utf-8") as f:
    f.write("\n".join(log_lines))
