package main

import (
	"database/sql"
	"fmt"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	"github.com/paulopkl/fullcycle-imersao-18/golang-microservice/internal/events/infra/repository"
	"github.com/paulopkl/fullcycle-imersao-18/golang-microservice/internal/events/infra/service"
	"github.com/paulopkl/fullcycle-imersao-18/golang-microservice/internal/events/usecase"

	httpHandler "github.com/paulopkl/fullcycle-imersao-18/golang-microservice/internal/events/infra/http"
)

func init() {
	// Carregar variáveis de ambiente a partir de um arquivo .env
	err := godotenv.Load()
	if err != nil {
		panic("Error on load Environment variables")
	}
}

func main() {
	dbUser := os.Getenv("DATABASE_USER")
	dbPass := os.Getenv("DATABASE_PASSWORD")
	dbHost := os.Getenv("DATABASE_HOST")
	dbPort := os.Getenv("DATABASE_PORT")
	dbName := os.Getenv("DATABASE_DB_NAME")

	backendApiURL := os.Getenv("API_URL")

	db, err := sql.Open("mysql", fmt.Sprintf("%s:%s@tcp(%s:%d)/%s", dbUser, dbPass, dbHost, dbPort, dbName))
	if err != nil {
		panic(err)
	}
	defer db.Close()

	eventRepo, err := repository.NewMysqlEventRepository(db)
	if err != nil {
		panic(err)
	}

	partnerBaseURLs := map[int]string{
		1: fmt.Sprintf("%s/partner1", backendApiURL),
		2: fmt.Sprintf("%s/partner2", backendApiURL),
		// 1: "http://localhost:9080/api1",
		// 2: "http://localhost:9080/api2",
	}

	partnerFactory := service.NewPartnerFactory(partnerBaseURLs)

	listEventsUseCase := usecase.NewListEventsUseCase(eventRepo)
	getEventUseCase := usecase.NewGetEventUseCase(eventRepo)
	listSpotsUseCase := usecase.NewListSpotsUseCase(eventRepo)
	buyTicketUseCase := usecase.NewBuyTicketsUseCase(eventRepo, partnerFactory)

	eventsHandler := httpHandler.NewEventHandler(
		listEventsUseCase,
		listSpotsUseCase,
		getEventUseCase,
		buyTicketUseCase,
	)

	r := http.NewServeMux()
	r.HandleFunc("/events", eventsHandler.ListEvents)
	r.HandleFunc("/events/{eventID}", eventsHandler.GetEvent)
	r.HandleFunc("/events/{eventID}/spots", eventsHandler.ListSpots)
	r.HandleFunc("POST /checkout", eventsHandler.BuyTickets)

	http.ListenAndServe(":8080", r)
}
