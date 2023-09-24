package user

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

type User struct {
	DisplayName string `json:"display_name"`
}

func Me(accessToken string) User {
	url := "https://api.spotify.com/v1/me"
	token := "Bearer " + accessToken

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Set("Authorization", token)

	client := &http.Client{}
	resp, _ := client.Do(req)

	body, _ := ioutil.ReadAll(resp.Body)
	var user User
	json.Unmarshal(body, &user)
	fmt.Printf("Hello %v", user.DisplayName)
	return user
}
