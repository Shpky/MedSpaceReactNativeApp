package main

import (
	"context"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"sae5dfc/medicineDataStruct"
	"sync"
	"time"
)

func medicineUpload() {

	ctx, cancel := context.WithTimeout(context.Background(), 1*time.Minute)
	defer cancel()
	client, err := mongo.Connect(ctx, options.Client().ApplyURI("mongodb://167.71.43.120:27016"))
	if err != nil {
		panic(err)
	}
	defer func() {
		if err = client.Disconnect(ctx); err != nil {
			panic(err)
		}
	}()

	database := client.Database("medspace")

	var wg sync.WaitGroup

	wg.Add(7)
	go medicineDataStruct.InsertManyCis(database, &wg)
	go medicineDataStruct.InsertManyCisCip(database, &wg)
	go medicineDataStruct.InsertManyCisCipDispoSpec(database, &wg)
	go medicineDataStruct.InsertManyCisCompo(database, &wg)
	go medicineDataStruct.InsertManyCisCpd(database, &wg)
	go medicineDataStruct.InsertManyCisGener(database, &wg)
	go medicineDataStruct.InsertManyCisHasSmr(database, &wg)
	wg.Wait()
}
