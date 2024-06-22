package repository

import "github.com/paulopkl/fullcycle-imersao-18/golang-microservice/internal/events/domain"

type EventRepository interface {
	ListEvents() ([]domain.Event, error)
	FindEventByID(eventID string) (*domain.Event, error)
	FindSpotsByEventID(eventID string, spotName string) (*domain.Spot, error)
	FindSpotsByName(eventID, spotName string) (*domain.Spot, error)
	// CreateEvent(event *domain.Event) error
	// CreateSpot(spot *domain.Spot) error
	// CreateTicket(spot *domain.Ticket) error
	ReserveSpot(spotID, ticketID string) error
}
