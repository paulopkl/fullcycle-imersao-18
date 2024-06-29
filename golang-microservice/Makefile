.PHONY: all clean swag init run

# Directories
SWAGGER_DIR = ./docs
CMD_DIR = ./cmd/events
HANDLER_DIR = ./internal/events/infra/http

# Binary name
BINARY_NAME = events

# Variables
DB_USER = test_user
DB_PASSWORD = test_password
DB_HOST = localhost
DB_PORT = 3306
DB_NAME = test_db

all: swag build run

# Clean the files generated
clean:
	rm -rf ${SWAGGER_DIR}
	rm -f ${BINARY_NAME}

# Generate the Swagger files
swag:
	swag init --output docs --dir ./cmd/events,./internal/events/infra/http,./internal/events/usecase

# Initialize database (if necessary)
init:
	mysql -u${DB_USER} -p${DB_PASSWORD} -P${DB_HOST} -e "CREATE DATABASE IF NOT EXISTS ${DB_NAME};"

# Compile the code
build:
	go build -o ${BINARY_NAME} ${CMD_DIR}/main.go

# Execute server
run: build
	./${BINARY_NAME}

# Command to facilitate the development (to swagger, compile and run)
dev: swag build run
