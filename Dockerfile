FROM ubuntu:22.04

# Instalar dependencias
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    wget \
    unzip \
    ca-certificates \
    libatomic1 \
    && rm -rf /var/lib/apt/lists/*

# Descargar Botpress (versión verificada)
RUN wget -O botpress.zip "https://cdn.botpress.dev/botpress-server/12.22.0/botpress-12.22.0-linux-x64.zip" && \
    [ -s botpress.zip ] || { echo "Error: Archivo descargado está vacío"; exit 1; }

# Preparar Botpress
RUN unzip botpress.zip -d /app && \
    mv /app/botpress-* /app/botpress && \
    chmod +x /app/botpress/bp && \
    rm botpress.zip

# Copiar TU bot (nombre exacto docbot.bpz)
COPY docbot.bpz /app/botpress/data/bots/
RUN unzip /app/botpress/data/bots/docbot.bpz -d /app/botpress/data/bots/docbot/ && \
    rm /app/botpress/data/bots/docbot.bpz

# Configuración
ENV BP_MODULE_PATH=/app/botpress/modules
ENV BP_DATA_DIR=/app/botpress/data
ENV PRO_ENABLED=false
ENV PORT=3000
EXPOSE 3000

# Iniciar
WORKDIR /app/botpress
CMD ["./bp"]
