import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse, unquote

# Base URL pattern
BASE_URL = "https://dokumenteligjore.com/documents?page={}"

# Folder to save files
SAVE_DIR = "/Users/metshehu/Documents/workingporjects/Python/LeaglAI/AISMARTSEARCH/hi"
os.makedirs(SAVE_DIR, exist_ok=True)

def get_clean_filename(headers, file_url, title):
    filename = None

    # Try content-disposition
    if "Content-Disposition" in headers:
        cd = headers["Content-Disposition"]

        # Look for filename* first (UTF-8 encoded)
        if "filename*=" in cd:
            filename = cd.split("filename*=")[-1].split("''")[-1]
            filename = unquote(filename)

        # Otherwise fallback to filename=
        elif "filename=" in cd:
            filename = cd.split("filename=")[-1].strip('" ;')

    # If still None, fallback to URL
    if not filename:
        parsed_url = urlparse(file_url)
        filename = os.path.basename(parsed_url.path)

    # Decode any %20 etc.
    filename = unquote(filename)

    # Remove unwanted suffix like "_downloaded"
    if filename.endswith("_downloaded.docx"):
        filename = filename.replace("_downloaded", "")

    # If no extension, default .docx
    if not os.path.splitext(filename)[1]:
        filename += ".docx"

    # Make safe for filesystem
    safe_filename = filename.replace(" ", "_").replace("/", "_")

    return safe_filename


for page in range(1, 17):  # loop 1 → 16
    url = BASE_URL.format(page)
    print(f"\n🔎 Scraping page {page}: {url}")

    try:
        response = requests.get(url)
        response.raise_for_status()
    except Exception as e:
        print(f"⚠️ Failed to fetch page {page}: {e}")
        continue

    soup = BeautifulSoup(response.text, "html.parser")

    # Find all cards
    cards = soup.find_all("div", class_="card text-center team-card")

    for card in cards:
        # Get the file title (from <p>)
        title_tag = card.find("p", class_="fw-semibold fs-17 mb-0 text-default")
        title = title_tag.get_text(strip=True) if title_tag else "file"

        # Get download link
        link_tag = card.find("a", href=True)
        if not link_tag:
            continue
        file_url = link_tag["href"]

        try:
            # Request the file
            file_response = requests.get(file_url, stream=True, timeout=15)
            file_response.raise_for_status()

            # Get clean filename
            filename = get_clean_filename(file_response.headers, file_url, title)
            filepath = os.path.join(SAVE_DIR, filename)

            print(f"⬇️  Downloading: {title} -> {filepath}")

            # Save file
            with open(filepath, "wb") as f:
                for chunk in file_response.iter_content(chunk_size=8192):
                    f.write(chunk)

        except Exception as e:
            print(f"❌ Skipping {file_url} ({title}) -> {e}")
            continue

print("\n✅ Done! All pages scraped and files downloaded (skipped broken ones).")

