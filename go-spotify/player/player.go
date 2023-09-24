package player

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

type P struct {
	Device PlayerDevice `json:"device"`
	CurrentlyPlaying
}

type PlayerDevice struct {
	Id         string `json:"id"`
	Active     bool   `json:"is_active"`
	Private    string `json:"is_private_session"`
	Name       string `json:"name"`
	DeviceType string `json:"type"`
}

type CurrentlyPlaying struct {
	Item     Track `json:"item"`
	Progress int   `json:"progress_ms"`
}

type Track struct {
	Name     string   `json:"name"`
	Artists  []Artist `json:"artists"`
	Album    Album    `json:"album"`
	Duration int      `json:"duration_ms"`
}

type Artist struct {
	Name string `json:"name"`
}

type Album struct {
	Name string `json:"name"`
}

func Player(accesToken string) {
	url := "https://api.spotify.com/v1/me/player"
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		fmt.Println("Error getting player")
	}
	token := "Bearer " + accesToken
	req.Header.Set("Authorization", token)

	client := &http.Client{}

	resp, _ := client.Do(req)

	body, _ := ioutil.ReadAll(resp.Body)
	var p P
	json.Unmarshal(body, &p)
	fmt.Print("\n\n")
	fmt.Printf("Device Information: %v", p.Device)
	fmt.Print("\n\n")
	percentageDuration := calculateDuration(p.Progress, p.Item.Duration)
	fmt.Printf("Track: %v \nArtists: %v \nAlbum: %v\nProgress/Length: %v/%v %v%%\n", p.CurrentlyPlaying.Item.Name, p.CurrentlyPlaying.Item.Artists, p.CurrentlyPlaying.Item.Album.Name, p.Progress, p.Item.Duration, percentageDuration)
}

func calculateDuration(progress int, duration int) string {
	percentage := (float32(progress) / float32(duration)) * 100
	return fmt.Sprintf("%.2f", percentage)
}
