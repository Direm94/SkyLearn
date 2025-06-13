FROM ubuntu:20.04

# 1. Instalar dependencias
RUN apt-get update && apt-get install -y wget unzip

# 2. Descargar Botpress (ÚLTIMA VERSIÓN ESTABLE - Junio 2025)
RUN wget -O botpress.zip https://github.com/botpress/botpress/releases/download/v12.30.1/botpress-12.30.1-linux-x64.zip

# 3. Descomprimir y preparar
RUN unzip botpress.zip -d ./botpress && chmod +x ./botpress/bp

# 4. Copiar TU bot (¡cambia "docbot.bpz" por tu nombre exacto!)
COPY docbot.bpz ./botpress/data/bots/
RUN unzip ./botpress/data/bots/docbot.bpz -d ./botpress/data/bots/docbot/

# 5. Configurar
ENV PORT=3000
ENV BP_MODULES_PATH=/botpress/modules
ENV BP_DATA_DIR=/botpress/data

# 6. Iniciar
CMD ["./botpress/bp"]
