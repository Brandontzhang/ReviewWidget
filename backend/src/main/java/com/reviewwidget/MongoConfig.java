package com.reviewwidget;

import org.bson.UuidRepresentation;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;

@Configuration
@EnableMongoRepositories
public class MongoConfig extends AbstractMongoClientConfiguration {

    
    @Override
    protected String getDatabaseName() {
        return "reviewwidget";
    }

    @Override
    public MongoClient mongoClient() {
        ConnectionString connectionString = new ConnectionString("mongodb+srv://Admin:Glhin2mlolGG@cluster1.yawkbjo.mongodb.net/test");
        MongoClientSettings mongoClientSettings = MongoClientSettings.builder()
                                                                    .uuidRepresentation(UuidRepresentation.STANDARD)
                                                                    .applyConnectionString(connectionString).build();


        return MongoClients.create(mongoClientSettings);
    }

}