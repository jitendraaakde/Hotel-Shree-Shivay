#!/usr/bin/env python3
"""
Turns the raw WhatsApp photos/videos in ../Images and ../Videos into
web-ready files in ../site/assets.

  python3 -I tools/prepare_media.py /path/to/ffmpeg

Needs Pillow. ffmpeg is optional (videos are skipped without it).
Re-run any time you add photos: edit the PHOTOS list below.
"""
import json
import os
import subprocess
import sys

from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC_IMG = os.path.join(ROOT, "Images")
SRC_VID = os.path.join(ROOT, "Videos")
OUT_IMG = os.path.join(ROOT, "site", "assets", "img")
OUT_VID = os.path.join(ROOT, "site", "assets", "video")
WIDTHS = [480, 960, 1600]
QUALITY = 76


def src(stamp):
    return os.path.join(SRC_IMG, f"WhatsApp Image 2026-11-14 at {stamp}.jpeg")


# crop: None = keep all; "wm" = trim the bottom strip that holds the
# "OPPO F23 5G" camera watermark; (l, t, r, b) = exact box in pixels.
WM = "wm"
PHOTOS = [
    # name,                 source stamp,      crop,                  category
    ("room-teal-wide",      "9.55.17 PM (1)",  None,                  "rooms"),
    ("room-teal-twin",      "9.55.08 PM",      None,                  "rooms"),
    ("room-teal-beds",      "9.58.45 PM",      WM,                    "rooms"),
    ("room-mirror-wide",    "9.55.18 PM",      None,                  "rooms"),
    ("room-mirror",         "9.55.19 PM",      (0, 0, 1080, 1290),    "rooms"),
    ("room-chevron-wide",   "9.55.20 PM (1)",  None,                  "rooms"),
    ("room-chevron-dark",   "9.55.20 PM",      WM,                    "rooms"),
    ("room-chevron-red",    "9.58.46 PM",      None,                  "rooms"),
    ("room-floral",         "9.55.14 PM",      None,                  "rooms"),
    ("room-floral-door",    "9.55.10 PM (1)",  None,                  "rooms"),
    ("bath-1",              "9.55.11 PM",      None,                  "bath"),
    ("bath-2",              "9.55.12 PM",      None,                  "bath"),
    ("ceiling-teal",        "9.58.49 PM (1)",  WM,                    "hotel"),
    ("ceiling-cove",        "9.58.50 PM",      WM,                    "hotel"),
    ("sign-night",          "9.58.54 PM",      (0, 200, 1080, 640),   "hotel"),
    ("entrance-door",       "9.58.55 PM",      WM,                    "hotel"),
    ("entrance-night",      "9.58.57 PM",      (0, 272, 720, 1135),   "hotel"),
    ("sign-day",            "9.59.00 PM",      (0, 272, 720, 1157),   "hotel"),
    ("standee",             "9.58.49 PM",      (0, 272, 720, 1130),   "hotel"),
]

VIDEOS = [
    ("tour-1", "WhatsApp Video 2026-11-14 at 9.53.24 PM.mp4"),
    ("tour-2", "WhatsApp Video 2026-11-14 at 9.53.25 PM.mp4"),
    ("tour-3", "WhatsApp Video 2026-11-14 at 9.53.26 PM.mp4"),
]


def export(im, name):
    sizes = []
    for w in WIDTHS:
        tw = min(w, im.width)
        if sizes and tw <= sizes[-1]:
            break
        th = round(im.height * tw / im.width)
        im.resize((tw, th), Image.LANCZOS).save(
            os.path.join(OUT_IMG, f"{name}-{tw}.webp"), "WEBP", quality=QUALITY, method=6
        )
        sizes.append(tw)
    return sizes


def main():
    os.makedirs(OUT_IMG, exist_ok=True)
    os.makedirs(OUT_VID, exist_ok=True)
    manifest = {}
    for name, stamp, crop, cat in PHOTOS:
        im = ImageOps.exif_transpose(Image.open(src(stamp))).convert("RGB")
        if crop == WM:
            im = im.crop((0, 0, im.width, int(im.height * 0.86)))
        elif crop:
            im = im.crop(crop)
        sizes = export(im, name)
        manifest[name] = {"w": im.width, "h": im.height, "sizes": sizes, "cat": cat}
        print(f"{name:20s} {im.width}x{im.height} -> {sizes}")

    ffmpeg = sys.argv[1] if len(sys.argv) > 1 else None
    if ffmpeg:
        for name, file in VIDEOS:
            inp = os.path.join(SRC_VID, file)
            out = os.path.join(OUT_VID, f"{name}.mp4")
            # Silent (room noise only), H.264 baseline-compatible, streamable.
            subprocess.run([ffmpeg, "-v", "error", "-y", "-i", inp, "-an",
                            "-c:v", "libx264", "-profile:v", "main", "-pix_fmt", "yuv420p",
                            "-crf", "25", "-preset", "slow", "-movflags", "+faststart", out],
                           check=True)
            poster = os.path.join(OUT_VID, f"{name}.jpg")
            subprocess.run([ffmpeg, "-v", "error", "-y", "-ss", "0.6", "-i", inp,
                            "-frames:v", "1", "-q:v", "4", poster], check=True)
            im = Image.open(poster)
            im.save(os.path.join(OUT_VID, f"{name}.webp"), "WEBP", quality=72)
            os.remove(poster)
            print(f"{name}: {im.size} {os.path.getsize(out)//1024} KB")

    with open(os.path.join(ROOT, "tools", "media-manifest.json"), "w") as f:
        json.dump(manifest, f, indent=1)


if __name__ == "__main__":
    main()
