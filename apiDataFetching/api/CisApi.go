package api

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"sae5dfc/medicineDataStruct"
	"time"
)

func findAllCis() ([]medicineDataStruct.CisData, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 1*time.Minute)
	defer cancel()
	client, err := mongo.Connect(ctx, options.Client().ApplyURI("mongodb://167.71.43.120:27016"))
	if err != nil {
		return nil, err
	}
	defer func() {
		if err = client.Disconnect(ctx); err != nil {
			panic(err)
		}
	}()

	database := client.Database("medspace")

	collection := database.Collection("cis")
	cursor, err := collection.Find(context.TODO(), bson.D{})
	if err != nil {
		return nil, err
	}
	defer func(find *mongo.Cursor, ctx context.Context) {
		err := find.Close(ctx)
		if err != nil {

		}
	}(cursor, context.TODO())

	var result []medicineDataStruct.CisData

	for cursor.Next(ctx) {
		var elem medicineDataStruct.CisData
		err := cursor.Decode(&elem)
		if err != nil {
			return nil, err
		}
		result = append(result, elem)
	}

	return result, nil
}
