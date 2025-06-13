FROM ubuntu:22.04

# 1. Instalar dependencias
RUN apt-get update && \
    apt-get install -y wget unzip && \
    rm -rf /var/lib/apt/lists/*

# 2. Descargar Botpress desde fuente alternativa (garantizada)
RUN wget -O botpress.zip "https://github.com/botpress/botpress/releases/download/v12.22.0/botpress-12.22.0-linux-x64.zip" || \
    wget -O botpress.zip "https://storage.googleapis.com/botpress-server/12.22.0/botpress-12.22.0-linux-x64.zip"

# 3. Verificar descarga
RUN if [ ! -f botpress.zip ]; then echo "ERROR: No se pudo descargar Botpress"; exit 1; fi

# 4. Instalar Botpress
RUN unzip botpress.zip -d /app && \
    mv /app/botpress-* /app/botpress && \
    chmod +x /app/botpress/bp && \
    rm botpress.zip

# 5. Copiar tu bot (nombre exacto docbot.bpz)
COPY docbot.bpz /app/botpress/data/bots/
RUN unzip /app/botpress/data/bots/docbot.bpz -d /app/botpress/data/bots/docbot/

# 6. Configuración
ENV BP_MODULE_PATH=/app/botpress/modules
ENV BP_DATA_DIR=/app/botpress/data
ENV PORT=3000
EXPOSE 3000

# 7. Iniciar
WORKDIR /app/botpress
CMD ["./bp"]
