import LeetcodeProblem from "../models/LeetcodeProblem"

export default class LeetcodeProblemController {

    static testUrl : string = 'http://localhost:8080/api';

    static getAll = async () : Promise<LeetcodeProblem[]> => {
        let res = await fetch(`${this.testUrl}/leetcodeproblems`);
        return res.json();
    }

    static addQuestion = async (problem : LeetcodeProblem) : Promise<LeetcodeProblem> =>  {
        let res = await fetch(`${this.testUrl}/leetcodeproblems`, {
            method: 'POST',
            headers: {
                'content-type' : 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(problem)
        });

        return res.json();
    }

}