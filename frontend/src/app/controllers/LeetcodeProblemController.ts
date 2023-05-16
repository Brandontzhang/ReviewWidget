import LeetcodeProblem from "../models/LeetcodeProblem"

const devMode : boolean = false;


export default class LeetcodeProblemController {

    devMode : boolean = true;

    static url : string = 'http://localhost:8080/api';

    constructor() {
        if (devMode) {
            LeetcodeProblemController.url = 'https://test-backend-386802.appspot.com/api'
        }
    }


    static getProblemsInCategory = async (category : string, shuffle? : boolean) : Promise<LeetcodeProblem[]> => {
        if (!shuffle) {
            shuffle = false;
        }
        let res = await fetch(`${this.url}/leetcodeproblems?category=${category}&shuffle=${shuffle}`)
        return res.json();
    }

    static getProblemById = async(id : string) : Promise<LeetcodeProblem> => {
        let res = await fetch(`${this.url}/leetcodeproblems/${id}`);
        return res.json();
    }

    static getAll = async (shuffle? : boolean) : Promise<LeetcodeProblem[]> => {
        if (!shuffle) {
            shuffle = false;
        }
        let res = await fetch(`${this.url}/leetcodeproblems?shuffle=${shuffle}`);
        return res.json();
    }

    static addQuestion = async (problem : LeetcodeProblem) : Promise<LeetcodeProblem> =>  {
        let res = await fetch(`${this.url}/leetcodeproblems`, {
            method: 'POST',
            headers: {
                'content-type' : 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(problem)
        });

        return res.json();
    }

    static getCategories = async () : Promise<string[]> => {
        let res = await fetch(`${this.url}/leetcodeproblems/categories`);
        return res.json();
    }

    static updateQuestion = async(problem : LeetcodeProblem) : Promise<LeetcodeProblem> => {
        let res = await fetch(`${this.url}/leetcodeproblems/${problem.id}`, {
            method: 'PUT',
            headers: {
                'content-type' : 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(problem)
        });

        return res.json();
    }

    static deleteQuestion = async(problem : LeetcodeProblem) => {
        await fetch(`${this.url}/leetcodeproblems/${problem.id}`, {
            method: 'DELETE',
            headers: {
                'content-type' : 'application/json;charset=UTF-8',
            },
        });
    }

}