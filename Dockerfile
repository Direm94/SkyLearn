FROM ubuntu:20.04

# Instalar dependencias
RUN apt-get update && \
    apt-get install -y wget unzip && \
    apt-get clean

# Descargar Botpress
RUN wget -O botpress.zip https://github.com/botpress/botpress/releases/download/v12.28.0/botpress-12.28.0-linux-x64.zip && \
    unzip botpress.zip -d ./botpress && \
    chmod +x ./botpress/bp

# Copiar tu bot (¡cambia "docbot.bpz" por el nombre real de tu archivo!)
COPY docbot.bpz /botpress/data/bots/docbot.bpz
RUN unzip /botpress/data/bots/docbot.bpz -d /botpress/data/bots/docbot/

# Configuración de Botpress
ENV PORT=3000
ENV BP_MODULES_PATH=/botpress/modules
ENV BP_DATA_DIR=/botpress/data

# Iniciar Botpress
CMD ["/botpress/bp"]
