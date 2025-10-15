import streamlit as st

st.set_page_config(page_title="Smart City 3D Realista", layout="wide")
st.title("🏙️ Smart City Turística Inteligente (3D)")

st.markdown("""
Esta é uma maquete digital **ultra-realista** de uma cidade urbana + turística.
- Prédios detalhados com janelas iluminadas  
- Casas com telhados inclinados  
- Praia, promenade e palmeiras  
- Interatividade total: roda e zoom com o rato  
Desenvolvido por **Batolomeu 👷‍♂️**
""")

# Carrega HTML externo
with open("index.html", "r", encoding="utf-8") as f:
    html_code = f.read()

st.components.v1.html(html_code, height=900, scrolling=False)
