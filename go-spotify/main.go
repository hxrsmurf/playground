package main

import (
	"fmt"
	"log"
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
}
