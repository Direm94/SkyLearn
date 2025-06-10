FROM node:16-alpine
WORKDIR /app

# Instalar Botpress
RUN wget https://github.com/botpress/botpress/releases/download/v12.28.0/botpress-v12.28.0-linux-x64.zip && \
    unzip botpress-*.zip && \
    rm botpress-*.zip && \
    chmod +x bp

# Puerto y variables
ENV BP_PORT=3000
ENV BP_HOST=0.0.0.0
EXPOSE 3000

# Iniciar
CMD ["./bp"]
