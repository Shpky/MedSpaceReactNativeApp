package api

import (
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"log"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestApi1(t *testing.T) {
	router := gin.Default()
	router.GET("/cis", apiCisHandling)
	err := router.Run("localhost:8080")
	if err != nil {
		return
	}

	w := httptest.NewRecorder()
	req, err := http.NewRequest("GET", "/cis", nil)
	if err != nil {
		log.Fatal(err)
	}
	router.ServeHTTP(w, req)

	assert.Equal(t, 200, w.Code)
}
