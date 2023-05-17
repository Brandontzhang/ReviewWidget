package com.reviewwidget.models;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="items")
public class LeetcodeProblem extends Item {
    
    public List<String> categories;

    public List<String> hints;

    public String answer;

    public String difficulty;

    @Autowired
    public LeetcodeProblem(String title, Date lastReviewedDate, int priority, String description, Type type, List<String> categories, String answer, List<String> hints, String difficulty) {
        this.type = Item.Type.LEETCODE;
        
        this.title = title;
        this.description = description;
        this.categories = categories;
        if (categories == null) {
            this.categories = new ArrayList<>();
        }
        this.hints = hints;
        this.answer = answer;
        this.difficulty = difficulty;

        this.priority = priority;
        this.lastReviewedDate = lastReviewedDate;
        this.setNextReviewDate();
    }

    public void updateProblem(LeetcodeProblem problem) {
        this.priority = problem.getPriority();
        this.description = problem.getDescription();
        this.difficulty = problem.getDifficulty();
        this.categories = problem.getCategories();
        this.hints = problem.getHints();
        this.answer = problem.getAnswer();
        this.lastReviewedDate = new Date();
        this.setNextReviewDate();
    }

    public List<String> getHints() {
        return this.hints;
    }

    public void addHint(String hint) {
        this.hints.add(hint);
    }

    public List<String> getCategories() {
        return this.categories;
    }

    public void setCategories(List<String> categories) {
        this.categories = categories;
    }

    public String getAnswer() {
        return this.answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public Type getType() {
        return this.type;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public String getDifficulty() {
        return this.difficulty;
    }

}
