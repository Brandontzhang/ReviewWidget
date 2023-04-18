package com.reviewwidget.models;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="items")
public class LeetcodeProblem extends Item {
    
    public String category;

    public List<String> testCases;

    public String answer;

    @Autowired
    public LeetcodeProblem(Date dateReviewed, String description, Type type, String category, String answer, List<String> testCases, int userDefinedPriority) {
        super(dateReviewed);
        this.type = Item.Type.LEETCODE;
        
        this.description = description;
        this.category = category;
        this.testCases = testCases;
        this.answer = answer;
        this.userDefinedPriority = userDefinedPriority;
    }

    public void updateProblem(LeetcodeProblem problem) {
        this.dateReviewed = problem.getDateReviewed();
        this.description = problem.getDescription();
        this.category = problem.getCategory();
        this.testCases = problem.getTestCases();
        this.answer = problem.getAnswer();
        this.userDefinedPriority = problem.getPriority();
    }

    public List<String> getTestCases() {
        return this.testCases;
    }

    public void addTestCase(String testCase) {
        this.testCases.add(testCase);
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
