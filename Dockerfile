FROM denoland/deno:2.5.0

WORKDIR /app

COPY . .

RUN deno install
RUN deno task build

EXPOSE 8080

CMD ["deno", "serve", "-A", "--port=8080", "_fresh/server.js"]