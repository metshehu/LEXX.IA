from openai import OpenAI
import os
from reportlab.lib.pagesizes import LETTER
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet

openai_key = os.environ.get("OPENAI_API_KEY")  # Read API key from env
client = OpenAI(api_key=openai_key)

messages2 = [
    {"role": "system", "content": "You are a legal assistant."},
    {"role": "user", "content": "Generate a basic NDA (non-disclosure agreement)."},
]

res = client.chat.completions.create(
    model="gpt-4o",
    messages=messages2,
    max_tokens=1500,
    temperature=0.2,
)

content = res.choices[0].message.content

# Save to PDF
file_path = os.path.join(
    "/Users/metshehu/Documents/workingporjects/Python/LeaglAI/AISMARTSEARCH/hi",
    "nda.pdf"
)
os.makedirs(os.path.dirname(file_path), exist_ok=True)

styles = getSampleStyleSheet()
doc = SimpleDocTemplate(file_path, pagesize=LETTER)
story = []

for line in content.split("\n"):
    if line.strip() == "":
        story.append(Spacer(1, 12))  # blank line
    else:
        story.append(Paragraph(line, styles["Normal"]))

doc.build(story)

print(f"PDF file saved at {file_path}")

