package main

import (
	"bufio"
	"fmt"
	"os"
	"time"

	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()
	now := time.Now()
	directoryPath := os.Getenv("directoryPath")
	formattedDate := now.Format("01-02-2006 - Monday")
	destinationFile := formattedDate + ".md"
	fullPath := directoryPath + destinationFile

	checkFileExists(fullPath)

	file, _ := os.OpenFile(fullPath, os.O_APPEND, 0777)

	defer file.Close()

	writer := bufio.NewWriter(file)

	fmt.Printf("Writing to: %v\n", destinationFile)

	fmt.Println("Enter text to write. Type 'exit' to quit")
	scanner := bufio.NewScanner(os.Stdin)

	for scanner.Scan() {
		input := scanner.Text()
		if input == "exit" {
			fmt.Print("Entry complete.")
			break
		}
		writer.WriteString(input + "\n")
		writer.Flush()
	}
}

func checkFileExists(fullPath string) {
	_, err := os.Stat(fullPath)

	if os.IsNotExist(err) {
		fmt.Println("File does not exist")
		file, _ := os.Create(fullPath)
		defer file.Close()
	}
}
