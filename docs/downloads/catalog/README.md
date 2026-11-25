# Translate CSV product titles with DeepSeek

Unzip this folder, then run `python3 translate_titles.py example.csv result.csv` (on Windows, `py translate_titles.py example.csv result.csv`). You need Python 3 and a [LinkAGI key](https://api.linktoagi.com/keys) in the DeepSeek group. Enter the key at the hidden prompt or set `LINKAGI_API_KEY` in the environment.

One nonempty title is translated by default. The script sends only the `title` field to `deepseek-v4.1-flash`. Each title uses one [metered API call](https://api.linktoagi.com/pricing). The new CSV contains `sku`, `title` and `title_en`. Check the translation before publishing. To translate more titles, use `--limit 20` and a new output filename. If interrupted, remove completed rows from a copy of the input before running again.
