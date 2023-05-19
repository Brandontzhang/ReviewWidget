export default interface Item {
    id : string;

    priority : number;

    title : string;

    description : string;

    lastReviewedDate : Date;

    nextReviewDate : Date;
}