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

type CisCompoData struct {
	CIS               int    `bson:"cis"`
	ElemName          string `bson:"elemName"`
	SubstanceCode     int    `bson:"substanceCode"`
	SubstanceName     string `bson:"substanceName"`
	SubstanceQuantity string `bson:"substanceQuantity"`
	QuantityReference string `bson:"quantityReference"`
	ComponentNature   string `bson:"componentNature"`
	SASTLink          int    `bson:"SASTLink"`
}

func NewCisCompoData(data []string) CisCompoData {
	CIS, err := strconv.Atoi(data[0])
	if err != nil {
		log.Fatal(err)
	}

	elemName := data[1]

	substanceCode, err := strconv.Atoi(data[2])
	if err != nil {
		log.Fatal(err)
	}

	substanceName := data[3]

	substanceQuantity := data[4]

	quantityReference := data[5]

	componentNature := data[6]

	SaStLink, err := strconv.Atoi(data[7])
	if err != nil {
		log.Fatal(err)
	}

	return CisCompoData{
		CIS:               CIS,
		ElemName:          elemName,
		SubstanceCode:     substanceCode,
		SubstanceName:     substanceName,
		SubstanceQuantity: substanceQuantity,
		QuantityReference: quantityReference,
		ComponentNature:   componentNature,
		SASTLink:          SaStLink,
	}
}

func LoadCisCompo(path string) *[]CisCompoData {
	file, err := os.Open(path)
	if err != nil {
		log.Fatal(err)
	}
	reader := transform.NewReader(file, charmap.Windows1252.NewDecoder())
	scanner := bufio.NewScanner(reader)

	var dataList []CisCompoData

	for scanner.Scan() {
		data := strings.Split(scanner.Text(), "\t")
		dataList = append(dataList, NewCisCompoData(data))
	}

	return &dataList
}

func InsertManyCisCompo(database *mongo.Database, wg *sync.WaitGroup) {
	defer wg.Done()

	ctx := context.TODO()

	collection := database.Collection("cisCompo")

	if err := collection.Drop(ctx); err != nil {
		log.Println("Error while dropping collection cisCompo :\n", err)
		return
	}

	data := *LoadCisCompo("medicineData/CIS_COMPO_bdpm.txt")
	documents := make([]interface{}, len(data))
	for i := range data {
		documents[i] = data[i]
	}

	if _, err := collection.InsertMany(ctx, documents); err != nil {
		log.Println("Error while inserting collection cisCompo :\n", err)
		return
	}
}
