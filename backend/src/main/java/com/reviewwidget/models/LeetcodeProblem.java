package com.reviewwidget.models;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="items")
public class LeetcodeProblem extends Item {
    
    public List<String> categories;

    public List<String> hints;

    public String answer;

    @Autowired
    public LeetcodeProblem(String title, Date date, String description, Type type, List<String> categories, String answer, List<String> hints, int userDefinedPriority) {
        super(date);
        this.type = Item.Type.LEETCODE;
        
        this.title = title;
        this.description = description;
        this.categories = categories;
        this.hints = hints;
        this.answer = answer;
        this.userDefinedPriority = userDefinedPriority;
    }

    public void updateProblem(LeetcodeProblem problem) {
        this.date = problem.getDate();
        this.title = problem.getTitle();
        this.description = problem.getDescription();
        this.categories = problem.getCategories();
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

}
