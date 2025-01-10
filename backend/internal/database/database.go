package database

import (
    "fmt"
    "gorm.io/gorm"
    "gorm.io/driver/postgres"
    "your-username/business-dashboard/internal/config"
    "your-username/business-dashboard/internal/models"
)

func InitDB(config *config.Config) *gorm.DB {
    dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
        config.DBHost, config.DBUser, config.DBPassword, config.DBName, config.DBPort)

    db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
    if err != nil {
        panic("Failed to connect to database: " + err.Error())
    }

    // Auto-migrate models
    err = db.AutoMigrate(&models.User{})
    if err != nil {
        panic("Failed to migrate database: " + err.Error())
    }

    return db
}