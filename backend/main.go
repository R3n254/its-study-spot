package main

import (
    "fmt"
    "log"
    "os"

    "github.com/gin-contrib/cors"
    "github.com/gin-gonic/gin"
    "github.com/joho/godotenv"
    "gorm.io/driver/postgres"
    "gorm.io/gorm"
)

type StudySpot struct {
    ID           uint   `json:"id" gorm:"primaryKey"`
    Name         string `json:"name"`
    Location     string `json:"location"`
    Description  string `json:"description"`
    WiFi         bool   `json:"wifi"`
    AC           bool   `json:"ac"`
    PowerOutlet  bool   `json:"powerOutlet"`
    NoiseLevel   string `json:"noiseLevel"`
    OpeningHours string `json:"openingHours"`
}

var DB *gorm.DB

func main() {
    err := godotenv.Load()
    if err != nil {
        log.Fatal("Error loading .env file")
    }

    dsn := fmt.Sprintf(
        "host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
        os.Getenv("DB_HOST"),
        os.Getenv("DB_USER"),
        os.Getenv("DB_PASSWORD"),
        os.Getenv("DB_NAME"),
        os.Getenv("DB_PORT"),
    )

    DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
    if err != nil {
        log.Fatal("Failed to connect to database: ", err)
    }

    fmt.Println("Connected to PostgreSQL!")

    err = DB.AutoMigrate(&StudySpot{})
    if err != nil {
        log.Fatal("Failed to migrate database: ", err)
    }

    fmt.Println("Database migration completed!")

    router := gin.Default()

    router.Use(cors.New(cors.Config{
        AllowOrigins: []string{"http://localhost:3000"},
        AllowMethods: []string{"GET", "POST", "PUT", "DELETE"},
        AllowHeaders: []string{"Origin", "Content-Type"},
    }))

router.GET("/", func(c *gin.Context) {
    c.JSON(200, gin.H{
        "message": "ITS Study Spot API is running",
    })
})

// Get all study spots
router.GET("/spots", func(c *gin.Context) {
    var spots []StudySpot

    if err := DB.Find(&spots).Error; err != nil {
        c.JSON(500, gin.H{"error": err.Error()})
        return
    }

    c.JSON(200, spots)
})

// Get one study spot
router.GET("/spots/:id", func(c *gin.Context) {
    var spot StudySpot

    if err := DB.First(&spot, c.Param("id")).Error; err != nil {
        c.JSON(404, gin.H{"error": "Study spot not found"})
        return
    }

    c.JSON(200, spot)
})

// Create a study spot
router.POST("/spots", func(c *gin.Context) {
    var spot StudySpot

    if err := c.ShouldBindJSON(&spot); err != nil {
        c.JSON(400, gin.H{"error": err.Error()})
        return
    }

    if err := DB.Create(&spot).Error; err != nil {
        c.JSON(500, gin.H{"error": err.Error()})
        return
    }

    c.JSON(201, spot)
})

// Update a study spot
router.PUT("/spots/:id", func(c *gin.Context) {
    var spot StudySpot

    if err := DB.First(&spot, c.Param("id")).Error; err != nil {
        c.JSON(404, gin.H{"error": "Study spot not found"})
        return
    }

    var input StudySpot

    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(400, gin.H{"error": err.Error()})
        return
    }

    spot.Name = input.Name
    spot.Location = input.Location
    spot.Description = input.Description
    spot.WiFi = input.WiFi
    spot.AC = input.AC
    spot.PowerOutlet = input.PowerOutlet
    spot.NoiseLevel = input.NoiseLevel
    spot.OpeningHours = input.OpeningHours

    DB.Save(&spot)

    c.JSON(200, spot)
})

// Delete a study spot
router.DELETE("/spots/:id", func(c *gin.Context) {
    var spot StudySpot

    if err := DB.First(&spot, c.Param("id")).Error; err != nil {
        c.JSON(404, gin.H{"error": "Study spot not found"})
        return
    }

    DB.Delete(&spot)

    c.JSON(200, gin.H{
        "message": "Study spot deleted successfully",
    })
})

router.Run(":8080")
}