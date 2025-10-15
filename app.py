import streamlit as st
import plotly.graph_objects as go
import random

st.set_page_config(page_title="Smart City 3D", layout="wide")

st.title("🏙️ Smart City Turística Inteligente")
st.write("Simulação 3D de uma cidade sustentável com edifícios, áreas verdes e painéis solares ☀️")

# Parâmetros da cidade
num_predios = st.slider("Número de edifícios", 10, 100, 30)
max_altura = st.slider("Altura máxima dos edifícios", 20, 200, 80)

# Gerar prédios
x, y, z, dx, dy, dz, cores = [], [], [], [], [], [], []
for _ in range(num_predios):
    x.append(random.randint(0, 100))
    y.append(random.randint(0, 100))
    z.append(0)
    dx.append(random.randint(4, 10))
    dy.append(random.randint(4, 10))
    dz.append(random.randint(10, max_altura))
    cores.append(random.choice(["#1E90FF", "#00BFFF", "#228B22", "#FFD700", "#FF8C00"]))

# Plot 3D
fig = go.Figure()

# Edifícios
for i in range(num_predios):
    fig.add_trace(go.Mesh3d(
        x=[x[i], x[i]+dx[i], x[i]+dx[i], x[i], x[i], x[i]+dx[i], x[i]+dx[i], x[i]],
        y=[y[i], y[i], y[i]+dy[i], y[i]+dy[i], y[i], y[i], y[i]+dy[i], y[i]+dy[i]],
        z=[z[i], z[i], z[i], z[i], z[i]+dz[i], z[i]+dz[i], z[i]+dz[i], z[i]+dz[i]],
        color=cores[i], opacity=0.9, flatshading=True,
        showscale=False
    ))

# Ajustes de visualização
fig.update_layout(
    scene=dict(
        xaxis=dict(visible=False),
        yaxis=dict(visible=False),
        zaxis=dict(visible=False),
        aspectratio=dict(x=1, y=1, z=0.5)
    ),
    margin=dict(l=0, r=0, b=0, t=0)
)

st.plotly_chart(fig, use_container_width=True)

st.success("🌆 Modelo de cidade turística inteligente gerado com sucesso!")
