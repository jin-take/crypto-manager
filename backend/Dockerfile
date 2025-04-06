FROM golang:1.24.2 AS builder
WORKDIR /src
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o /app ./cmd

FROM gcr.io/distroless/base-debian12
COPY --from=builder /app /app
EXPOSE 8080
ENTRYPOINT ["/app"]