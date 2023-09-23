package main

import (
	"fmt"
	"net/http"
	"os"
	"strings"

	"github.com/joho/godotenv"
)

func code(w http.ResponseWriter, r *http.Request) {
	queryValues := r.URL.Query()
	code := queryValues.Get("code")
	fmt.Fprint(w, code)
	fmt.Println(code)
}

func auth(w http.ResponseWriter, r *http.Request) {
	urlTemplate := "https://identity.pagerduty.com/oauth/authorize?client_id={CLIENT_ID}&redirect_uri={REDIRECT_URI}&scope={SCOPE}&response_type=code&code_challenge_method=S256&code_challenge"

	if err := godotenv.Load(); err != nil {
		fmt.Printf("Error loading .env file: %v", err)
	}

	// Load variables from .env
	clientId := os.Getenv("clientId")
	redirectURI := os.Getenv("redirectURI")
	scope := os.Getenv("scope")

	// Replace placeholders with actual values
	url := strings.ReplaceAll(urlTemplate, "{CLIENT_ID}", clientId)
	url = strings.ReplaceAll(url, "{REDIRECT_URI}", redirectURI)
	url = strings.ReplaceAll(url, "{SCOPE}", scope)

	http.Redirect(w, r, url, http.StatusFound)
}

func main() {
	fmt.Println("http://localhost:8000/auth")
	http.HandleFunc("/auth", auth)
	http.HandleFunc("/", code)
	http.ListenAndServe(":8000", nil)
}
