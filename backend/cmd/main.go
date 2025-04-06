package main

import (
    "database/sql"
    "fmt"
    "log"
    "net/http"
    "os"

    _ "github.com/lib/pq"
)

func main() {
    dsn := fmt.Sprintf(
        "host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
        os.Getenv("DB_HOST"),
        os.Getenv("DB_PORT"),
        os.Getenv("DB_USER"),
        os.Getenv("DB_PASSWORD"),
        os.Getenv("DB_NAME"),
    )
    db, err := sql.Open("postgres", dsn)
    if err != nil {
        log.Fatalf("db open: %v", err)
    }
    defer db.Close()

    if err := db.Ping(); err != nil {
        log.Fatalf("db ping: %v", err)
    }

    mux := http.NewServeMux()
    mux.HandleFunc("/api/health", func(w http.ResponseWriter, r *http.Request) {
        w.Write([]byte("ok"))
    })

    // サンプル: ユーザ一覧取得
    mux.HandleFunc("/api/users", func(w http.ResponseWriter, r *http.Request) {
        rows, err := db.Query("SELECT id, name FROM users LIMIT 10")
        if err != nil {
            http.Error(w, err.Error(), http.StatusInternalServerError)
            return
        }
        defer rows.Close()
        var resp string
        for rows.Next() {
            var id int
            var name string
            if err := rows.Scan(&id, &name); err != nil {
                http.Error(w, err.Error(), http.StatusInternalServerError)
                return
            }
            resp += fmt.Sprintf("%d:%s", id, name)
	}
		w.Write([]byte(resp))
	})

	log.Println("Listening on :8080")
	log.Fatal(http.ListenAndServe(":8080", mux))
}