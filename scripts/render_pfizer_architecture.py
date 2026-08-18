"""Render the Pfizer document-intelligence architecture diagram."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

W, H, SCALE = 1920, 1080, 2
OUT = (
    Path(__file__).resolve().parents[1]
    / "src"
    / "imports"
    / "pfizer"
    / "architecture.png"
)

BG = (247, 242, 234)
INK = (42, 31, 22)
MUTED = (90, 72, 58)
MATCHA = (143, 173, 110)
MATCHA_DEEP = (122, 145, 96)
MATCHA_SOFT = (232, 239, 220)
CREAM = (239, 230, 214)
CHOCOLATE = (106, 74, 53)
OAT = (217, 205, 181)
LATTE = (196, 180, 154)
CARD = (255, 253, 248)
WHITE = (255, 255, 255)


def S(n: float) -> int:
    return round(n * SCALE)


def font(size: float, bold: bool = False) -> ImageFont.FreeTypeFont:
    name = "Arial Bold.ttf" if bold else "Arial.ttf"
    path = f"/System/Library/Fonts/Supplemental/{name}"
    return ImageFont.truetype(path, S(size))


def rounded(draw: ImageDraw.ImageDraw, box, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(
        [S(box[0]), S(box[1]), S(box[2]), S(box[3])],
        radius=S(radius),
        fill=fill,
        outline=outline,
        width=S(width) if outline else 0,
    )


def text(
    draw: ImageDraw.ImageDraw,
    xy,
    value: str,
    size: float,
    *,
    bold: bool = False,
    fill=INK,
    anchor: str = "lt",
):
    draw.text(
        (S(xy[0]), S(xy[1])),
        value,
        font=font(size, bold),
        fill=fill,
        anchor=anchor,
    )


def text_width(value: str, size: float, bold: bool = False) -> float:
    dummy = ImageDraw.Draw(Image.new("RGB", (1, 1)))
    box = dummy.textbbox((0, 0), value, font=font(size, bold))
    return (box[2] - box[0]) / SCALE


def pill(draw, cx, cy, label: str, fill=MATCHA_SOFT, outline=MATCHA_DEEP):
    pad_x, pad_y = 16, 9
    tw = text_width(label, 15, True)
    w, h = tw + pad_x * 2, 15 + pad_y * 2
    box = (cx - w / 2, cy - h / 2, cx + w / 2, cy + h / 2)
    rounded(draw, box, 14, fill, outline, 1.5)
    text(draw, (cx, cy + 1), label, 15, bold=True, fill=CHOCOLATE, anchor="mm")
    return box


def card(draw, box, title: str, lines: list[str]):
    rounded(draw, box, 16, CARD, LATTE, 1.75)
    x0, y0, x1, _ = box
    text(draw, ((x0 + x1) / 2, y0 + 28), title, 18, bold=True, fill=INK, anchor="mm")
    for i, line in enumerate(lines):
        text(
            draw,
            ((x0 + x1) / 2, y0 + 54 + i * 22),
            line,
            14,
            fill=MUTED,
            anchor="mm",
        )


def group(draw, box, label: str, fill, outline):
    rounded(draw, box, 24, fill, outline, 2)
    tw = text_width(label.upper(), 13, True)
    lx, ly = box[0] + 22, box[1] + 18
    rounded(
        draw,
        (lx, ly, lx + tw + 20, ly + 26),
        8,
        WHITE,
        outline,
        1.5,
    )
    text(
        draw,
        (lx + 10 + tw / 2, ly + 14),
        label.upper(),
        13,
        bold=True,
        fill=CHOCOLATE,
        anchor="mm",
    )


def arrow(draw, x0, y, x1, label: str | None = None):
    draw.line([(S(x0), S(y)), (S(x1 - 10), S(y))], fill=CHOCOLATE, width=S(2.5))
    head = [
        (S(x1), S(y)),
        (S(x1 - 12), S(y - 6)),
        (S(x1 - 12), S(y + 6)),
    ]
    draw.polygon(head, fill=CHOCOLATE)
    if label:
        text(draw, ((x0 + x1) / 2, y - 16), label, 12, bold=True, fill=MATCHA_DEEP, anchor="mm")


def down_join(draw, x, y0, y1):
    draw.line([(S(x), S(y0)), (S(x), S(y1))], fill=CHOCOLATE, width=S(2.5))


def main() -> None:
    img = Image.new("RGB", (W * SCALE, H * SCALE), BG)
    draw = ImageDraw.Draw(img)

    text(draw, (960, 52), "Document Intelligence Pipeline", 34, bold=True, fill=INK, anchor="mm")
    text(
        draw,
        (960, 92),
        "Ingest  →  preprocess  →  OCR  →  structured JSON  →  classify  →  RAG",
        16,
        fill=MUTED,
        anchor="mm",
    )

    # Swimlanes
    group(draw, (48, 140, 430, 1028), "Ingest", CREAM, OAT)
    group(draw, (454, 140, 980, 1028), "Process", MATCHA_SOFT, MATCHA)
    group(draw, (1004, 140, 1408, 1028), "Structure", CREAM, OAT)
    group(draw, (1432, 140, 1872, 1028), "Retrieve", MATCHA_SOFT, MATCHA)

    # --- Ingest cards
    card(draw, (78, 230, 400, 430), "Digital PDFs", ["Native text & tables", "Vendor templates"])
    card(draw, (78, 700, 400, 900), "Scans & images", ["Labels, POs, shipping", "Variable scan quality"])

    text(draw, (239, 560), "Pharmaceutical", 13, fill=MUTED, anchor="mm")
    text(draw, (239, 582), "supply-chain docs", 13, fill=MUTED, anchor="mm")

    # --- Process: digital path
    card(
        draw,
        (500, 230, 820, 430),
        "PyMuPDF + pdfplumber",
        ["Text extraction", "Layout & coordinates"],
    )
    # --- Process: scan path
    card(
        draw,
        (500, 560, 820, 720),
        "OpenCV + PIL",
        ["Resize, crop, contrast", "Denoise scanned pages"],
    )
    card(
        draw,
        (500, 760, 820, 960),
        "OCR ensemble",
        ["Tesseract · PaddleOCR", "EasyOCR — by layout"],
    )

    # --- Structure
    card(
        draw,
        (1036, 320, 1376, 560),
        "Structured JSON",
        ["Field values", "Page coordinates", "Source-backed audit trail"],
    )
    card(
        draw,
        (1036, 640, 1376, 860),
        "Classify & route",
        ["Shipping · labels · POs", "Per-type extraction"],
    )

    # --- Retrieve
    card(
        draw,
        (1464, 230, 1840, 430),
        "RAG index",
        ["LlamaIndex", "FAISS + Chroma"],
    )
    card(
        draw,
        (1464, 500, 1840, 700),
        "Grounded LLMs",
        ["Gemini · Mistral · Phi-2", "Answers from retrieved docs"],
    )
    card(
        draw,
        (1464, 770, 1840, 960),
        "Search UI",
        ["Gradio / Streamlit", "Natural-language Q&A"],
    )

    # Digital: ingest → parse → JSON
    arrow(draw, 400, 330, 500, "text + layout")
    arrow(draw, 820, 330, 1036, "native text")

    # Scans: ingest → OpenCV → OCR → JSON
    draw.line([(S(400), S(800)), (S(448), S(800))], fill=CHOCOLATE, width=S(2.5))
    draw.line([(S(448), S(800)), (S(448), S(640))], fill=CHOCOLATE, width=S(2.5))
    arrow(draw, 448, 640, 500, "images")
    down_join(draw, 660, 720, 760)
    draw.line([(S(820), S(860)), (S(960), S(860))], fill=CHOCOLATE, width=S(2.5))
    draw.line([(S(960), S(860)), (S(960), S(480))], fill=CHOCOLATE, width=S(2.5))
    arrow(draw, 960, 480, 1036, "OCR text")

    # JSON → classify → RAG
    down_join(draw, 1206, 560, 640)
    draw.line([(S(1376), S(750)), (S(1404), S(750))], fill=CHOCOLATE, width=S(2.5))
    draw.line([(S(1404), S(750)), (S(1404), S(330))], fill=CHOCOLATE, width=S(2.5))
    arrow(draw, 1404, 330, 1464, "index")

    # RAG stack internal
    down_join(draw, 1652, 430, 500)
    down_join(draw, 1652, 700, 770)

    png = img.resize((W, H), Image.Resampling.LANCZOS)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    png.save(OUT, "PNG", optimize=True)
    print(f"wrote {OUT} ({png.size[0]}x{png.size[1]})")


if __name__ == "__main__":
    main()
