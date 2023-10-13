package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
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

	createMonthlyFiles(directoryPath, now)
	createMonthlyFolders(directoryPath, now)
	checkFileExists(fullPath)

	file, _ := os.OpenFile(fullPath, os.O_APPEND, 0777)

	defer file.Close()

	writer := bufio.NewWriter(file)

	fmt.Printf("Writing to: %v\n", fullPath)

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
		if !(strings.HasSuffix(fullPath, ".md")) {
			fmt.Printf("Folder does not exist: %v \n", fullPath)
			os.MkdirAll(fullPath, os.ModePerm)
		} else {
			fmt.Printf("File does not exist: %v \n", fullPath)
			file, _ := os.Create(fullPath)
			defer file.Close()
		}
	}
}

func createMonthlyFiles(fullPath string, now time.Time) {
	firstDayOfMonth := time.Date(now.Year(), now.Month(), 1, 0, 0, 0, 0, time.Local)
	lastDayOfMonth := firstDayOfMonth.AddDate(0, 1, -1)
	currentDay := firstDayOfMonth

	for currentDay.Before(lastDayOfMonth) || currentDay.Equal(lastDayOfMonth) {
		formattedDate := currentDay.Format("01-02-2006 - Monday")
		destinationFile := formattedDate + ".md"
		targetPath := fullPath + destinationFile

		checkFileExists(targetPath)

		currentDay = currentDay.AddDate(0, 0, 1)
	}
}

func createMonthlyFolders(fullPath string, now time.Time) {
	year := now.Year()
	months := []string{}

	for month := time.January; month <= time.December; month++ {
		firstDayOfMonth := time.Date(year, month, 1, 0, 0, 0, 0, time.UTC)
		months = append(months, firstDayOfMonth.Format("01 - January"))
	}

	for _, month := range months {
		targetPath := fullPath + month
		checkFileExists(targetPath)
	}
}
