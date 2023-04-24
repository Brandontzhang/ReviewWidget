import Item from "./Item";

export default interface LeetcodeProblem extends Item {
    categories : string[];

    hints : string[];

    answer : string;
}