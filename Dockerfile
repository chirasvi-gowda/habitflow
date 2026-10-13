FROM denoland/deno:latest

WORKDIR /app

COPY . .

RUN deno task build

ENV PORT=8080

EXPOSE 8080

CMD ["deno", "serve", "-A", "--port=8080", "_fresh/server.js"]