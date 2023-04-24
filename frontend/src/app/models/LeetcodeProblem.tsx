import Item from "./Item";

export default interface LeetcodeProblem extends Item {
    category : string;

    hints : string[];

    answer : string;
}