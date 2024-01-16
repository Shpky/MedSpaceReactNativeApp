package api

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func RunApi() {
	router := gin.Default()
	router.GET("/cis", apiCisHandling)
	err := router.Run("localhost:8080")
	if err != nil {
		return
	}
}

func apiCisHandling(c *gin.Context) {
	data, err := findAllCis()
	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, "")
	}
	c.IndentedJSON(http.StatusOK, data)
}
