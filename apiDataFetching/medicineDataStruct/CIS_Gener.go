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

var generalMedicineTypeConverter = map[string]string{
	"0": "princeps",
	"1": "générique",
	"2": "génériques par complémentarité posologique",
	"3": "générique substituable",
}

type CisGenerData struct {
	GeneralMedicineGroup        int    `bson:"generalMedicineGroup"`
	GeneralMedicineGroupWording string `bson:"generalMedicineGroupWording"`
	CIS                         int    `bson:"cis"`
	GeneralMedicineType         string `bson:"generalMedicineType"`
	SortingNumber               int    `bson:"sortingNumber"`
}

func NewCisGenerData(data []string) CisGenerData {

	generalMedicineGroup, err := strconv.Atoi(data[0])
	if err != nil {
		log.Fatal(err)
	}

	generalMedicineGroupWording := data[1]

	CIS, err := strconv.Atoi(data[2])
	if err != nil {
		log.Fatal(err)
	}

	generalMedicineType := generalMedicineTypeConverter[data[3]]

	sortingNumber, err := strconv.Atoi(data[4])
	if err != nil {
		log.Fatal(err)
	}

	return CisGenerData{
		GeneralMedicineGroup:        generalMedicineGroup,
		GeneralMedicineGroupWording: generalMedicineGroupWording,
		CIS:                         CIS,
		GeneralMedicineType:         generalMedicineType,
		SortingNumber:               sortingNumber,
	}
}

func LoadCisGener(path string) *[]CisGenerData {
	file, err := os.Open(path)
	if err != nil {
		log.Fatal(err)
	}
	reader := transform.NewReader(file, charmap.Windows1252.NewDecoder())
	scanner := bufio.NewScanner(reader)

	var dataList []CisGenerData

	for scanner.Scan() {
		data := strings.Split(scanner.Text(), "\t")
		dataList = append(dataList, NewCisGenerData(data))
	}

	return &dataList
}

func InsertManyCisGener(database *mongo.Database, wg *sync.WaitGroup) {
	defer wg.Done()

	ctx := context.TODO()

	collection := database.Collection("cisGener")

	if err := collection.Drop(ctx); err != nil {
		log.Println("Error while dropping collection cisGener :\n", err)
		return
	}

	data := *LoadCisGener("medicineData/CIS_GENER_bdpm.txt")
	documents := make([]interface{}, len(data))
	for i := range data {
		documents[i] = data[i]
	}

	if _, err := collection.InsertMany(ctx, documents); err != nil {
		log.Println("Error while inserting collection cisGener :\n", err)
		return
	}
}
