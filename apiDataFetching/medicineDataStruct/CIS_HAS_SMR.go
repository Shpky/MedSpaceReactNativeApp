package medicineDataStruct

import (
	"bufio"
	"context"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/text/encoding/charmap"
	"golang.org/x/text/transform"
	"log"
	"os"
	"strconv"
	"strings"
	"sync"
	"time"
)

type CisHasSmrData struct {
	CIS              int       `bson:"cis"`
	HAS              string    `bson:"has"`
	EvaluationReason string    `bson:"evaluationReason"`
	Date             time.Time `bson:"date"`
	SMRValue         string    `bson:"smrValue"`
	SMRText          string    `bson:"smrText"`
}

func NewCisHasSmrData(data []string) CisHasSmrData {

	CIS, err := strconv.Atoi(data[0])
	if err != nil {
		log.Fatal(err)
	}

	HAS := data[1]

	evaluationReason := data[2]

	dateString := data[3]
	year, _ := strconv.Atoi(dateString[0:4])
	month, _ := strconv.Atoi(dateString[4:6])
	day, _ := strconv.Atoi(dateString[6:8])
	date := time.Date(year, time.Month(month), day, 0, 0, 0, 0, time.UTC)

	SMRValue := data[4]

	SMRText := data[5]

	return CisHasSmrData{
		CIS:              CIS,
		HAS:              HAS,
		EvaluationReason: evaluationReason,
		Date:             date,
		SMRValue:         SMRValue,
		SMRText:          SMRText,
	}
}

func LoadCisHasSmr(path string) *[]CisHasSmrData {
	file, err := os.Open(path)
	if err != nil {
		log.Fatal(err)
	}
	reader := transform.NewReader(file, charmap.Windows1252.NewDecoder())
	scanner := bufio.NewScanner(reader)

	var dataList []CisHasSmrData

	for scanner.Scan() {
		data := strings.Split(scanner.Text(), "\t")
		dataList = append(dataList, NewCisHasSmrData(data))
	}

	return &dataList
}

func InsertManyCisHasSmr(database *mongo.Database, wg *sync.WaitGroup) {
	defer wg.Done()

	ctx := context.TODO()

	collection := database.Collection("cisHasSmr")

	if err := collection.Drop(ctx); err != nil {
		log.Println("Error while dropping collection cisHasSmr :\n", err)
		return
	}

	data := *LoadCisHasSmr("medicineData/CIS_HAS_SMR_bdpm.txt")
	documents := make([]interface{}, len(data))
	for i := range data {
		documents[i] = data[i]
	}

	if _, err := collection.InsertMany(ctx, documents); err != nil {
		log.Println("Error while inserting collection cisHasSmr :\n", err)
		return
	}
}
