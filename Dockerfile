FROM ubuntu:20.04
RUN apt-get update && apt-get install -y wget unzip
RUN wget -O botpress.zip https://s3.amazonaws.com/botpress-binaries/botpress-12.28.3-linux-x64.zip
RUN unzip botpress.zip -d ./botpress && chmod +x ./botpress/bp
COPY docbot.bpz ./botpress/data/bots/
RUN unzip ./botpress/data/bots/docbot.bpz -d ./botpress/data/bots/docbot/
ENV PORT=3000
ENV BP_MODULES_PATH=/botpress/modules
ENV BP_DATA_DIR=/botpress/data
CMD ["./botpress/bp"]
