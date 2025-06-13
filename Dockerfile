FROM ubuntu:20.04
RUN apt-get update && apt-get install -y wget unzip
RUN wget -O botpress.zip https://github.com/botpress/botpress/releases/download/v12.28.0/botpress-12.28.0-linux-x64.zip
RUN unzip botpress.zip -d ./botpress && chmod +x ./botpress/bp
COPY tu-bot.bpz ./botpress/data/bots/
RUN unzip ./botpress/data/bots/tu-bot.bpz -d ./botpress/data/bots/tu-bot/
CMD ["./botpress/bp"]
