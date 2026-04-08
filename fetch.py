import urllib.request
import re

css_urls = [
    "https://gjimnazi-hasannahi.com/wp-content/uploads/elementor/css/post-1041.css",
    "https://gjimnazi-hasannahi.com/wp-content/uploads/elementor/css/post-6.css"
]
for url in css_urls:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        css = urllib.request.urlopen(req).read().decode('utf-8')
        print(f"--- {url} ---")
        matches = re.findall(r'background(?:-image)?:\s*url\(([^)]+)\)', css)
        for match in matches:
            print(match)
    except Exception as e:
        print(e)
