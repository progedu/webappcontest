#!/usr/bin/env python3
"""Rebuild the winter site's small WOFF2 subsets from official Google Fonts.

Dependencies: fontTools==4.68.0, Brotli==1.2.1 (install in an isolated venv).
Run: python scripts/rebuild-winter-fonts.py
An alternate site tree can be selected with --root /path/to/2026/winter.
The unlisted preview tree is detected when the canonical winter tree is absent.
TTFs and the JSON audit report stay in the temporary source cache selected by
--sources; only the WOFF2 files and the optional program font's OFL license
are written into the site tree. Use --program-font-only to rebuild the small
special-program button font without modifying the two reading/display fonts.
"""

import argparse
import hashlib
import html
import json
from pathlib import Path
import tempfile
from urllib.request import urlopen

import brotli
import fontTools
from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

GOOGLE_FONTS_COMMIT = "83c62e30d87daa70216dab6b984d00d20d96d585"
GOOGLE_FONTS_BASE = (
    f"https://raw.githubusercontent.com/google/fonts/{GOOGLE_FONTS_COMMIT}/ofl"
)
SOURCES = [
    {
        "source": "NotoSansJP[wght].ttf",
        "url": f"{GOOGLE_FONTS_BASE}/notosansjp/NotoSansJP%5Bwght%5D.ttf",
        "sha256": "c2f3b4d463500a2ddcd3849cded1fceeb9fd6d1c32e6cbecd568453ba50fc68f",
        "output": "noto-sans-jp-text.woff2",
        "variable": True,
    },
    {
        "source": "ZenMaruGothic-Bold.ttf",
        "url": f"{GOOGLE_FONTS_BASE}/zenmarugothic/ZenMaruGothic-Bold.ttf",
        "sha256": "fe24426b9c8b5523a0146a8235c8674eccf0493af354a53ec895c3596d9eb745",
        "output": "zen-maru-gothic-700.woff2",
        "variable": False,
    },
]
PROGRAM_FONT = {
    "source": "ZenOldMincho-Bold.ttf",
    "url": f"{GOOGLE_FONTS_BASE}/zenoldmincho/ZenOldMincho-Bold.ttf",
    "sha256": "d6b95c1ff45c8dac153d28961e4c37d7d03b648330c71f884d124dc652a13c0d",
    "output": "zen-old-mincho-program-700.woff2",
    "variable": False,
    "text": "特番ページへ",
    "license": {
        "source": "ZenOldMincho-OFL.txt",
        "url": f"{GOOGLE_FONTS_BASE}/zenoldmincho/OFL.txt",
        "sha256": "469d214f9842809659c827b7f2adaf40ec0df6efdd5fe18b7127665c32aafaec",
        "output": "zen-old-mincho-OFL.txt",
    },
}
COMMON_RANGES = [
    (0x20, 0x7E),  # ASCII.
    (0xA0, 0xFF),  # Latin punctuation and symbols.
    (0x2000, 0x206F),  # General punctuation.
    (0x2190, 0x2199),  # Common arrows.
    (0x3000, 0x303F),  # Japanese punctuation.
    (0xFF00, 0xFFEF),  # Fullwidth/halfwidth forms.
]


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def require(condition, message):
    if not condition:
        raise ValueError(message)


def describe_characters(codepoints):
    return ", ".join(f"U+{cp:04X} {chr(cp)!r}" for cp in sorted(codepoints))


def get_source(cache, item):
    source = cache / item["source"]
    data = source.read_bytes() if source.exists() else urlopen(item["url"], timeout=60).read()
    require(
        hashlib.sha256(data).hexdigest() == item["sha256"],
        f"Source SHA256 mismatch: {source}",
    )
    if not source.exists():
        source.write_bytes(data)
    return source


def default_site_root():
    repository = Path(__file__).resolve().parents[1]
    canonical = repository / "2026/winter"
    if (canonical / "index.html").is_file():
        return canonical
    previews = [
        page.parent
        for page in (repository / "preview").glob("*/index.html")
        if (page.parent / "assets/fonts/zen-maru-gothic-700.woff2").is_file()
    ]
    return previews[0] if len(previews) == 1 else canonical


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--root",
        type=Path,
        default=default_site_root(),
        help="site tree containing index.html and assets (default: winter or unlisted preview)",
    )
    parser.add_argument(
        "--sources",
        type=Path,
        default=Path(tempfile.gettempdir()) / "winter-contest-font-sources",
        help="temporary cache for official source TTFs and the audit report",
    )
    program_options = parser.add_mutually_exclusive_group()
    program_options.add_argument(
        "--include-program-font",
        action="store_true",
        help="also rebuild the label-only Zen Old Mincho special-program button font",
    )
    program_options.add_argument(
        "--program-font-only",
        action="store_true",
        help="rebuild only the special-program button font and its OFL license",
    )
    args = parser.parse_args()
    args.root = args.root.expanduser().resolve()
    args.sources = args.sources.expanduser().resolve()
    args.sources.mkdir(parents=True, exist_ok=True)
    inputs = [
        args.root / "index.html",
        args.root / "assets/css/style.css",
        *sorted((args.root / "assets/js").glob("*.js")),
    ]
    # Read complete sources so hidden content, ARIA labels, comments and JS
    # strings remain covered; also include decoded HTML entities.
    corpus = "".join(path.read_text(encoding="utf-8") for path in inputs)
    corpus += html.unescape(corpus)
    # Font glyphs do not encode control characters (tabs/newlines).
    required = {ord(c) for c in corpus if not c.isspace()} | {0x20}
    common = {cp for start, end in COMMON_RANGES for cp in range(start, end + 1)}
    report = {
        "fonttools": fontTools.__version__,
        "brotli": brotli.__version__,
        "google_fonts_commit": GOOGLE_FONTS_COMMIT,
        "input_files": {str(path): digest(path) for path in inputs},
        "required_characters": len(required),
        "fonts": [],
    }
    items = [PROGRAM_FONT] if args.program_font_only else SOURCES + (
        [PROGRAM_FONT] if args.include_program_font else []
    )
    for item in items:
        source = get_source(args.sources, item)
        font = TTFont(source, recalcTimestamp=False)
        original_version = font["name"].getDebugName(5)
        original_license = font["name"].getDebugName(13)
        available = set(font.getBestCmap())
        font_required = (set(map(ord, item["text"])) | {0x20}) if "text" in item else required
        missing = font_required - available
        require(not missing, f"Source lacks required characters: {describe_characters(missing)}")
        wanted = font_required if "text" in item else font_required | (common & available)
        options = subset.Options()
        options.name_IDs = ["*"]  # Preserve original names and license metadata.
        options.name_languages = ["*"]
        options.layout_features = ["*"]
        subsetter = subset.Subsetter(options=options)
        subsetter.populate(unicodes=wanted)
        subsetter.subset(font)
        if item["variable"]:
            font = instantiateVariableFont(
                font, {"wght": (400, 400, 700)}, inplace=True, updateFontNames=True
            )
        font.flavor = "woff2"
        target = args.root / "assets/fonts" / item["output"]
        target.parent.mkdir(parents=True, exist_ok=True)
        font.save(target)
        rebuilt = TTFont(target, recalcTimestamp=False)
        cmap = set(rebuilt.getBestCmap())
        missing = wanted - cmap
        require(not missing, f"Subset lost requested glyphs: {describe_characters(missing)}")
        if "text" not in item:
            require(set(map(ord, "加点ポイント視聴特鋭凝解")) <= cmap, "Regression glyphs missing")
        require(rebuilt["name"].getDebugName(13) == original_license, "License metadata changed")
        axes = (
            {a.axisTag: [a.minValue, a.defaultValue, a.maxValue] for a in rebuilt["fvar"].axes}
            if "fvar" in rebuilt
            else {}
        )
        if item["variable"]:
            require(axes == {"wght": [400, 400, 700]}, f"Unexpected variable axes: {axes}")
            require(rebuilt["OS/2"].usWeightClass == 400, "Noto default weight must be 400")
        else:
            require(not axes and rebuilt["OS/2"].usWeightClass == 700, "Font must be static 700")
        font_report = {
            "path": str(target), "source_url": item["url"],
            "source_version": original_version, "source_sha256": item["sha256"],
            "bytes": target.stat().st_size, "sha256": digest(target),
            "family": rebuilt["name"].getDebugName(1),
            "subfamily": rebuilt["name"].getDebugName(2),
            "weight": rebuilt["OS/2"].usWeightClass, "axes": axes,
            "cmap_characters": len(cmap), "required_missing": [],
            "extra_common_characters": len(wanted - font_required),
        }
        if "text" in item:
            font_report["label"] = item["text"]
        if "license" in item:
            license_source = get_source(args.sources, item["license"])
            license_target = target.parent / item["license"]["output"]
            license_target.write_bytes(license_source.read_bytes())
            font_report["license"] = {
                "path": str(license_target),
                "source_url": item["license"]["url"],
                "sha256": digest(license_target),
            }
        report["fonts"].append(font_report)
    report_path = args.sources / "winter-font-rebuild-report.json"
    report_path.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(report, ensure_ascii=False, indent=2))
    print(f"Report: {report_path}")


if __name__ == "__main__":
    main()
