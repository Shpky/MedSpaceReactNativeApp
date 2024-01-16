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
)

type CisCpdData struct {
	CIS                   int    `bson:"cis"`
	PrescriptionCondition string `bson:"prescriptionCondition"`
}

func NewCisDpdData(data []string) CisCpdData {

	CIS, err := strconv.Atoi(data[0])
	if err != nil {
		log.Fatal(err)
	}

	prescriptionCondition := data[1]

	return CisCpdData{
		CIS:                   CIS,
		PrescriptionCondition: prescriptionCondition,
	}
}

func LoadCisCpd(path string) *[]CisCpdData {
	file, err := os.Open(path)
	if err != nil {
		log.Fatal(err)
	}
	reader := transform.NewReader(file, charmap.Windows1252.NewDecoder())
	scanner := bufio.NewScanner(reader)

	var dataList []CisCpdData

	for scanner.Scan() {
		data := strings.Split(scanner.Text(), "\t")
		dataList = append(dataList, NewCisDpdData(data))
	}

	return &dataList
}

func InsertManyCisCpd(database *mongo.Database, wg *sync.WaitGroup) {
	defer wg.Done()

	ctx := context.TODO()

	collection := database.Collection("cisCpd")

	if err := collection.Drop(ctx); err != nil {
		log.Println("Error while dropping collection cisCpd :\n", err)
		return
	}

	data := *LoadCisCpd("medicineData/CIS_CPD_bdpm.txt")
	documents := make([]interface{}, len(data))
	for i := range data {
		documents[i] = data[i]
	}

	if _, err := collection.InsertMany(ctx, documents); err != nil {
		log.Println("Error while inserting collection cisCpd :\n", err)
		return
	}
}
