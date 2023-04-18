package com.reviewwidget.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.reviewwidget.models.Item;
import com.reviewwidget.models.LeetcodeProblem;

@Repository
public interface LeetcodeProblemRepositoryImpl extends MongoRepository<LeetcodeProblem, UUID> {

    @Query(value="{type:'?0'}")
    List<Item> findAll(Item.Type type);

}
