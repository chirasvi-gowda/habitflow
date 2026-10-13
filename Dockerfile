FROM denoland/deno:2.5.0

WORKDIR /app

COPY . .

RUN deno install

RUN deno task build

EXPOSE 8000

CMD ["deno", "task", "start"]