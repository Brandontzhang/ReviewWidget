import LeetcodeProblem from "../models/LeetcodeProblem"

export default class LeetcodeProblemController {

    static testUrl : string = 'http://localhost:8080/api';

    static getProblemsInCategory = async (category : string, shuffle? : boolean) : Promise<LeetcodeProblem[]> => {
        if (!shuffle) {
            shuffle = false;
        }
        let res = await fetch(`${this.testUrl}/leetcodeproblems?category=${category}&shuffle=${shuffle}`)
        return res.json();
    }

    static getAll = async (shuffle? : boolean) : Promise<LeetcodeProblem[]> => {
        if (!shuffle) {
            shuffle = false;
        }
        let res = await fetch(`${this.testUrl}/leetcodeproblems?shuffle=${shuffle}`);
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

    static getCategories = async () : Promise<string[]> => {
        let res = await fetch(`${this.testUrl}/leetcodeproblems/categories`);
        return res.json();
    }

    static updateQuestion = async(problem : LeetcodeProblem) : Promise<LeetcodeProblem> => {
        let res = await fetch(`${this.testUrl}/leetcodeproblems/${problem.id}`, {
            method: 'PUT',
            headers: {
                'content-type' : 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(problem)
        });

        return res.json();
    }

    static deleteQuestion = async(problem : LeetcodeProblem) => {
        await fetch(`${this.testUrl}/leetcodeproblems/${problem.id}`, {
            method: 'DELETE',
            headers: {
                'content-type' : 'application/json;charset=UTF-8',
            },
        });
    }

}