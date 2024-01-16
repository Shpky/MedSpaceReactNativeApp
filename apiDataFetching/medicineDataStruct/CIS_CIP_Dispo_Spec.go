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

var dispoStatusConverter = map[string]string{
	"1": "Rupture de stock",
	"2": "Tension d'approvisionnement",
	"3": "Arrêt de commercialisation",
	"4": "Remise à disposition",
}

type CisCipDispoSpecData struct {
	CIS int `bson:"cis"`
	//CIP13 is skip because not present in all records and can be retrieved by linking information
	DispoStatus   string    `bson:"dispoStatus"`
	StatusWording string    `bson:"statusWording"`
	StartingDate  time.Time `bson:"startingDate"`
	UpdateDate    time.Time `bson:"UpdateDate"`
	ProvidingDate time.Time `bson:"ProvidingDate"`
	Link          string    `bson:"link"`
}

func NewCisCipDispoSpecData(data []string) CisCipDispoSpecData {

	CIS, err := strconv.Atoi(data[0])
	if err != nil {
		log.Fatal(err)
	}

	//Skip data[1] which is CIS13

	//Reversed in the description file
	dispoStatus := data[3]

	statusWording := data[2]

	dateSlice := strings.Split(data[4], "/")
	year, _ := strconv.Atoi(dateSlice[2])
	month, _ := strconv.Atoi(dateSlice[1])
	day, _ := strconv.Atoi(dateSlice[0])
	startingDate := time.Date(year, time.Month(month), day, 0, 0, 0, 0, time.UTC)

	dateSlice = strings.Split(data[5], "/")
	year, _ = strconv.Atoi(dateSlice[2])
	month, _ = strconv.Atoi(dateSlice[1])
	day, _ = strconv.Atoi(dateSlice[0])
	updateDate := time.Date(year, time.Month(month), day, 0, 0, 0, 0, time.UTC)

	var providingDate time.Time
	if len(data[6]) > 0 {
		dateSlice = strings.Split(data[6], "/")
		year, _ = strconv.Atoi(dateSlice[2])
		month, _ = strconv.Atoi(dateSlice[1])
		day, _ = strconv.Atoi(dateSlice[0])
		providingDate = time.Date(year, time.Month(month), day, 0, 0, 0, 0, time.UTC)
	} else {
		//If date is 01-01-1970, it mean that there is no value for this date
		providingDate = time.Date(1970, 1, 1, 0, 0, 0, 0, time.UTC)
	}

	link := data[7]

	return CisCipDispoSpecData{
		CIS:           CIS,
		DispoStatus:   dispoStatus,
		StatusWording: statusWording,
		StartingDate:  startingDate,
		UpdateDate:    updateDate,
		ProvidingDate: providingDate,
		Link:          link,
	}
}

func LoadCisCipDispoSpec(path string) *[]CisCipDispoSpecData {
	file, err := os.Open(path)
	if err != nil {
		log.Fatal(err)
	}
	reader := transform.NewReader(file, charmap.Windows1252.NewDecoder())
	scanner := bufio.NewScanner(reader)

	var dataList []CisCipDispoSpecData

	for scanner.Scan() {
		data := strings.Split(scanner.Text(), "\t")
		dataList = append(dataList, NewCisCipDispoSpecData(data))
	}
	return &dataList
}

func InsertManyCisCipDispoSpec(database *mongo.Database, wg *sync.WaitGroup) {
	defer wg.Done()

	ctx := context.TODO()

	collection := database.Collection("cisCipDispoSpec")

	if err := collection.Drop(ctx); err != nil {
		log.Println("Error while dropping collection cisCipDispoSpec :\n", err)
		return
	}

	data := *LoadCisCipDispoSpec("medicineData/CIS_CIP_Dispo_Spec.txt")
	documents := make([]interface{}, len(data))
	for i := range data {
		documents[i] = data[i]
	}

	if _, err := collection.InsertMany(ctx, documents); err != nil {
		log.Println("Error while inserting collection cisCipDispoSpec :\n", err)
		return
	}
}
