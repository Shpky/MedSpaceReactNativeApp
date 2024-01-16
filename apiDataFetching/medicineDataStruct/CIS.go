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

type CisData struct {
	CIS                    int       `bson:"_id"`
	MedName                string    `bson:"medName"`
	PharmaForm             string    `bson:"pharmaForm"`
	AdministrationRoutes   []string  `bson:"administrationRoutes"`
	MA                     string    `bson:"marketingAuth"` //MA Stand for Marketing Authorisation
	MAType                 string    `bson:"marketingAuthType"`
	SellingState           string    `bson:"sellingState"`
	MADate                 time.Time `bson:"marketingAuthDate"`
	BdmState               string    `bson:"bdmState"`
	EuAuthNumber           string    `bson:"EuAuthNumber"`
	Owner                  []string  `bson:"owners"`
	ReinforcedSurveillance bool      `bson:"reinforcedSurveillance"`
}

// NewCisData create new CisData
func NewCisData(data []string) CisData {
	CIS, err := strconv.Atoi(data[0])
	if err != nil {
		log.Fatal(err)
	}

	medName := data[1]

	pharmaForm := data[2]

	administrationRoutes := strings.Split(data[3], ";")

	ma := data[4]

	maType := data[5]

	sellingState := data[6]

	dateSlice := strings.Split(data[7], "/")
	year, _ := strconv.Atoi(dateSlice[2])
	month, _ := strconv.Atoi(dateSlice[1])
	day, _ := strconv.Atoi(dateSlice[0])
	maDate := time.Date(year, time.Month(month), day, 0, 0, 0, 0, time.UTC)

	bdmState := data[8]

	euAuthorNum := data[9]

	owner := strings.Split(data[10], ";")

	reinfoSurvei := true
	if data[11] == "Non" {
		reinfoSurvei = false
	}

	return CisData{
		CIS:                    CIS,
		MedName:                medName,
		PharmaForm:             pharmaForm,
		AdministrationRoutes:   administrationRoutes,
		MA:                     ma,
		MAType:                 maType,
		SellingState:           sellingState,
		MADate:                 maDate,
		BdmState:               bdmState,
		EuAuthNumber:           euAuthorNum,
		Owner:                  owner,
		ReinforcedSurveillance: reinfoSurvei,
	}
}

func LoadCis(path string) *[]CisData {
	file, err := os.Open(path)
	if err != nil {
		log.Fatal(err)
	}
	reader := transform.NewReader(file, charmap.Windows1252.NewDecoder())
	scanner := bufio.NewScanner(reader)

	var dataList []CisData

	for scanner.Scan() {
		data := strings.Split(scanner.Text(), "\t")
		dataList = append(dataList, NewCisData(data))
	}

	return &dataList
}

func InsertManyCis(database *mongo.Database, wg *sync.WaitGroup) {
	defer wg.Done()

	ctx := context.TODO()

	collection := database.Collection("cis")

	if err := collection.Drop(ctx); err != nil {
		log.Println("Error while dropping collection cis :\n", err)
		return
	}

	data := *LoadCis("medicineData/CIS_bdpm.txt")
	documents := make([]interface{}, len(data))
	for i := range data {
		documents[i] = data[i]
	}

	if _, err := collection.InsertMany(ctx, documents); err != nil {
		log.Println("Error while inserting collection cis :\n", err)
		return
	}
}
