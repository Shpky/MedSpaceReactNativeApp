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

type CisCipData struct {
	CIS                        int       `bson:"cis"`
	CIP7                       int       `bson:"_id"`
	PresentationWording        string    `bson:"presentationWording"`
	PresentationStat           string    `bson:"presentationStat"`
	CommercialPresentationStat string    `bson:"CommercialPresentationStat"`
	CommercialDeclarationDate  time.Time `bson:"commercialDeclarationDate"`
	CIP13                      int       `bson:"cip13"`
	CollectivityAgreement      string    `bson:"collectivityAgreement"`
	RepaymentRate              []string  `bson:"repaymentRate"`
	Price                      []float32 `bson:"price"`
	RepaymentInformation       string    `bson:"repaymentInformation"`
}

func NewCisCipData(data []string) CisCipData {
	CIS, err := strconv.Atoi(data[0])
	if err != nil {
		log.Fatal(err)
	}

	CIP7, err := strconv.Atoi(data[1])
	if err != nil {
		log.Fatal(err)
	}

	presentationWording := data[2]

	presentationStat := data[3]

	commercialPresentationStat := data[4]

	dateSlice := strings.Split(data[5], "/")
	year, _ := strconv.Atoi(dateSlice[2])
	month, _ := strconv.Atoi(dateSlice[1])
	day, _ := strconv.Atoi(dateSlice[0])
	commercialDeclarationDate := time.Date(year, time.Month(month), day, 0, 0, 0, 0, time.UTC)

	CIP13, err := strconv.Atoi(data[6])

	collectivityAgreement := data[7]

	repaymentRate := strings.Split(data[8], ";")
	for i := range repaymentRate {
		repaymentRate[i] = strings.TrimSpace(repaymentRate[i])
	}

	var price []float32
	for i := 0; i < 3; i++ {
		tempStr := data[9+i]
		if data[9+i] == "" {
			continue
		}
		if strings.Count(tempStr, ",") > 1 {
			tempStr = strings.Replace(tempStr, ",", "", 1)
		}
		tempVal, err := strconv.ParseFloat(strings.ReplaceAll(tempStr, ",", "."), 32)
		if err != nil {
			log.Fatal(err)
		}
		price = append(price, float32(tempVal))
	}

	repaymentInformation := data[12]

	return CisCipData{
		CIS:                        CIS,
		CIP7:                       CIP7,
		PresentationWording:        presentationWording,
		PresentationStat:           presentationStat,
		CommercialPresentationStat: commercialPresentationStat,
		CommercialDeclarationDate:  commercialDeclarationDate,
		CIP13:                      CIP13,
		CollectivityAgreement:      collectivityAgreement,
		RepaymentRate:              repaymentRate,
		Price:                      price,
		RepaymentInformation:       repaymentInformation,
	}
}

func LoadCisCip(path string) *[]CisCipData {
	file, err := os.Open(path)
	if err != nil {
		log.Fatal(err)
	}
	reader := transform.NewReader(file, charmap.Windows1252.NewDecoder())
	scanner := bufio.NewScanner(reader)

	var dataList []CisCipData

	for scanner.Scan() {
		data := strings.Split(scanner.Text(), "\t")
		dataList = append(dataList, NewCisCipData(data))
	}
	return &dataList
}

func InsertManyCisCip(database *mongo.Database, wg *sync.WaitGroup) {
	defer wg.Done()

	ctx := context.TODO()

	collection := database.Collection("cisCip")

	if err := collection.Drop(ctx); err != nil {
		log.Println("Error while dropping collection cisCip :\n", err)
		return
	}

	data := *LoadCisCip("medicineData/CIS_CIP_bdpm.txt")
	documents := make([]interface{}, len(data))
	for i := range data {
		documents[i] = data[i]
	}

	if _, err := collection.InsertMany(ctx, documents); err != nil {
		log.Println("Error while inserting collection cisCip :\n", err)
		return
	}
}
