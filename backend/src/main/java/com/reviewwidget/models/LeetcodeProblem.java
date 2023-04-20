package com.reviewwidget.models;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="items")
public class LeetcodeProblem extends Item {
    
    public String category;

    public List<String> hints;

    public String answer;

    @Autowired
    public LeetcodeProblem(String title, Date dateReviewed, String description, Type type, String category, String answer, List<String> hints, int userDefinedPriority) {
        super(dateReviewed);
        this.type = Item.Type.LEETCODE;
        
        this.title = title;
        this.description = description;
        this.category = category;
        this.hints = hints;
        this.answer = answer;
        this.userDefinedPriority = userDefinedPriority;
    }

    public void updateProblem(LeetcodeProblem problem) {
        this.dateReviewed = problem.getDateReviewed();
        this.title = problem.getTitle();
        this.description = problem.getDescription();
        this.category = problem.getCategory();
        this.hints = problem.getHints();
        this.answer = problem.getAnswer();
        this.userDefinedPriority = problem.getPriority();
    }

    public List<String> getHints() {
        return this.hints;
    }

    public void addHint(String hint) {
        this.hints.add(hint);
    }

    public String getCategory() {
        return this.category;
    }

    public void setCategory(String category) {
        this.category = category;
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

}
