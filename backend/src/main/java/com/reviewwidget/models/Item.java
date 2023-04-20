package com.reviewwidget.models;

import java.util.Comparator;
import java.util.Date;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "items")
public abstract class Item {

    @Id
    protected UUID uid = UUID.randomUUID();

    protected int userDefinedPriority;

    protected String title;

    protected String description;

    protected Date dateReviewed;

    protected Type type;

    public enum Type {
        LEETCODE
    }

    public Item() {
        this.userDefinedPriority = 0;
        this.description = "";
    }

    public Item(Date dateReviewed) {
        this();
        this.dateReviewed = dateReviewed;
    }

    public static Comparator<Item> getItemComparator() {
        Comparator<Item> compare = (i1, i2) -> i1.getPriority() - i2.getPriority();

        return compare;
    }

    private int calculatePriority() {
        // Calculate the priority 
        // Depends on user priority and time between date reviewed and current date 

        Date currentDate = new Date();
        long diffInMS = currentDate.getTime() - this.dateReviewed.getTime();
        long diffInDays = TimeUnit.DAYS.convert(diffInMS, TimeUnit.MILLISECONDS);
        
        if (diffInDays <= 1) {
            // Lowest priority, last reviewed in last day or so
            return userDefinedPriority;
        } else if (diffInDays <= 7) {
            // Can be selected, but mostly dependent on the user's priority
            return userDefinedPriority + 1;
        } else {
            // It's been a bit long, just review it real quick
            return 5;
        }
    }

    public UUID getId() {
        return this.uid;
    }

    public int getPriority() {
        // Calculate Priority here
        return this.calculatePriority();
    }

    public int getUserDefinedPriority() {
        return this.userDefinedPriority;
    }

    public void setUserDefinedPriority(int userDefinedPriority) {
        this.userDefinedPriority = userDefinedPriority;
    }

    public Date getDateReviewed() {
        return this.dateReviewed;
    }

    public void setDateReviewed(Date dateReviewed) {
        this.dateReviewed = dateReviewed;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

}