package models

import (
    "gorm.io/gorm"
    "golang.org/x/crypto/bcrypt"
)

type User struct {
    gorm.Model
    Email    string `gorm:"uniqueIndex;not null" json:"email"`
    Password string `json:"-"`
    Name     string `json:"name"`
    Role     string `json:"role"`
}

func (u *User) BeforeCreate(tx *gorm.DB) error {
    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
    if err != nil {
        return err
    }
    u.Password = string(hashedPassword)
    return nil
}

func (u *User) ComparePassword(password string) error {
    return bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(password))
}