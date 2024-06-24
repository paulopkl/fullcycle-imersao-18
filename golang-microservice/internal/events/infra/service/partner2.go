package service

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
)

type Partner2 struct {
	BaseURL string
}

type Partner2ReservationRequest struct {
	Lugares      []string `json:"lugares"`
	TipoIngresso string   `json:"tipo_ingresso"`
	Email        string   `json:"email"`
}

type Partner2ReservationResponse struct {
	ID           string `json:"id"`
	Email        string `json:"email"`
	Lugar        string `json:"lugar"`
	TipoIngresso string `json:"ticket_kind"`
	Status       string `json:"status"`
	EventoID     string `json:"evento_id"`
}

func (p *Partner2) MakeReservation(req *ReservationRequest) ([]ReservationResponse, error) {
	partnerReq := Partner2ReservationRequest{
		Lugares:      req.Spots,
		TipoIngresso: req.TicketType,
		Email:        req.Email,
	}

	jsonRequest, err := json.Marshal(partnerReq)
	if err != nil {
		return nil, err
	}

	url := fmt.Sprintf("%s/eventos/%s/reservar", p.BaseURL, req.EventID)

	httpReq, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonRequest))
	if err != nil {
		return nil, err
	}

	httpReq.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	httpResponse, err := client.Do(httpReq)
	if err != nil {
		return nil, err
	}
	defer httpResponse.Body.Close()

	if httpResponse.StatusCode != http.StatusCreated {
		return nil, fmt.Errorf("reservation failed with status code: %d", httpResponse.StatusCode)
	}

	var partnerResp []Partner2ReservationResponse
	if err := json.NewDecoder(httpResponse.Body).Decode(partnerResp); err != nil {
		return nil, err
	}

	response := make([]ReservationResponse, len(partnerResp))
	for i, res := range partnerResp {
		response[i] = ReservationResponse{
			ID:     res.ID,
			Spot:   res.Lugar,
			Status: res.Status,
		}
	}

	return response, nil
}
