package main

import (
    "log"
    "os"
    "github.com/gin-gonic/gin"
    "github.com/joho/godotenv"
    "your-username/business-dashboard/internal/config"
    "your-username/business-dashboard/internal/database"
    "your-username/business-dashboard/internal/handlers"
)

func main() {
    if err := godotenv.Load(); err != nil {
        log.Println("No .env file found")
    }

    config := config.LoadConfig()
    db := database.InitDB(config)
    defer db.Close()

    r := gin.Default()

    // CORS configuration
    r.Use(cors.New(cors.Config{
        AllowOrigins:     []string{os.Getenv("FRONTEND_URL")},
        AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
        AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
        AllowCredentials: true,
    }))

    // Routes
    api := r.Group("/api")
    handlers.SetupRoutes(api, db)

    port := os.Getenv("PORT")
    if port == "" {
        port = "8080"
    }

    log.Printf("Server starting on port %s", port)
    if err := r.Run(":" + port); err != nil {
        log.Fatal("Server failed to start:", err)
    }
}