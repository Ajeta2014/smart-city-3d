import streamlit as st

st.set_page_config(page_title="Smart City 3D", layout="wide")
st.title("🏙️ Smart City Turística Inteligente (3D)")

# Carrega a página HTML externa
with open("index.html", "r", encoding="utf-8") as f:
    html_code = f.read()

st.components.v1.html(html_code, height=820, scrolling=False)
