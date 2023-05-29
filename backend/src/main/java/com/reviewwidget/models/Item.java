package com.reviewwidget.models;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Comparator;
import java.util.Date;
import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "items")
public abstract class Item {

    @Id
    protected UUID uid = UUID.randomUUID();

    protected String title;

    protected String description;

    protected Date lastReviewedDate;

    protected Date nextReviewDate;

    protected Type type;

    protected int priority;

    public enum Type {
        LEETCODE
    }

    public Item() {
        this.description = "";
    }

    public Item(Date lastReviewedDate) {
        this();
        this.lastReviewedDate = lastReviewedDate;
    }

    public static Comparator<Item> getItemComparator() {
        Comparator<Item> compare = (i1, i2) -> i1.getPriority() - i2.getPriority();

        return compare;
    }

    public void setNextReviewDate() {
        int daysOffset = 0;

        switch(this.priority) {
            case 1:
                daysOffset = 28;
                break;
            case 2:
                daysOffset = 14;
                break;
            case 3:
                daysOffset = 7;
                break;
            case 4:
                daysOffset = 5;
                break;
            case 5:
                daysOffset = 3;
                break;
            default:
                daysOffset = 0;
                break;
        }

        this.nextReviewDate = this.getDateOffsetByDays(lastReviewedDate, daysOffset);
    }

    public UUID getId() {
        return this.uid;
    }

    public int getPriority() {
        return this.priority;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }

    public Date getLastReviewedDate() {
        return this.lastReviewedDate;
    }

    public void setLastReviewedDate(Date lastReviewedDate) {
        this.lastReviewedDate = lastReviewedDate;
    }

    public Date getNextReviewDate() {
        return this.nextReviewDate;
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

    protected Date getDateOffsetByDays(Date date, int daysOffset) {
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        c.add(Calendar.DATE, daysOffset);
        return c.getTime();
    }

    public boolean isDue() {
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        Date current = cal.getTime();

        cal.setTime(this.nextReviewDate);
        Date review = cal.getTime();

        SimpleDateFormat fmt = new SimpleDateFormat("yyyyMMdd");

        System.out.println(this.title);
        System.out.println(fmt.format(review));

        return review.before(current) || fmt.format(current).equals(fmt.format(review));
    }

}