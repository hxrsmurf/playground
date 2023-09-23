package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	clientId := os.Getenv("clientId")
	clientSecret := os.Getenv("clientSecret")
	fmt.Println(clientId, clientSecret)

	http.HandleFunc("/hello", helloHandler)
	http.HandleFunc("/login", login)
	http.HandleFunc("/callback", callback)
	fmt.Println("http://localhost:8000/login")
	http.ListenAndServe(":8000", nil)
}

func helloHandler(w http.ResponseWriter, r *http.Request) {
	io.WriteString(w, "Hello World!\n")
}

func login(w http.ResponseWriter, r *http.Request) {
	const redirectUri = "http://localhost:8000/callback"
	const spotifyUrl = "https://accounts.spotify.com/authorize?"
	values := url.Values{}
	values.Add("response_type", "code")
	values.Add("client_id", os.Getenv("clientId"))
	values.Add("scope", "user-read-email")
	values.Add("redirect_uri", redirectUri)
	values.Add("state", "1234")
	queryString := values.Encode()
	url := spotifyUrl + queryString
	http.Redirect(w, r, url, http.StatusFound)
}

func callback(w http.ResponseWriter, r *http.Request) {
	queryValues := r.URL.Query()
	code := queryValues.Get("code")
	fmt.Fprint(w, code)
	fmt.Println(code)
}
