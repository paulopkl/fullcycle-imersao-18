package usecase

type SpotDTO struct {
	ID       string `json:"id"`
	Name     string `json:"name"`
	EventID  string `json:"event_id"`
	Reserved string `json:"reserved"`
	Status   string `json:"status"`
	TicketID string `json:"ticket_id"`
}

type TicketDTO struct {
	ID         string  `json:"id"`
	SpotID     string  `json:"spot_id"`
	TicketType string  `json:"ticket_type"`
	Price      float64 `json:"price"`
}
