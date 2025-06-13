FROM ubuntu:20.04
RUN apt-get update && apt-get install -y wget unzip
RUN wget -O botpress.zip https://github.com/botpress/botpress/releases/download/v12.30.1/botpress-12.30.1-linux-x64.zip
RUN unzip botpress.zip -d ./botpress && chmod +x ./botpress/bp
COPY docbot.bpz ./botpress/data/bots/
RUN unzip ./botpress/data/bots/docbot.bpz -d ./botpress/data/bots/docbot/
CMD ["./botpress/bp"]
