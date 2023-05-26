import LeetcodeProblem from "../models/LeetcodeProblem"

const devMode : boolean = false;

export default class LeetcodeProblemController {

    url : string = 'http://localhost:8080/api';

    constructor() {
        let devMode = false;
        if (!devMode) {
            this.url = 'https://test-backend-386802.appspot.com/api';
        }
    }


    getProblemsInCategory = async (category : string, shuffle? : boolean, due? : boolean) : Promise<LeetcodeProblem[]> => {
        if (!shuffle) {
            shuffle = false;
        }
        let res = await fetch(`${this.url}/leetcodeproblems?category=${category}&shuffle=${shuffle}&due=${due}`)
        return res.json();
    }

    getProblemById = async(id : string) : Promise<LeetcodeProblem> => {
        let res = await fetch(`${this.url}/leetcodeproblems/${id}`);
        return res.json();
    }

    getAll = async (shuffle? : boolean, due? : boolean) : Promise<LeetcodeProblem[]> => {
        if (!shuffle) {
            shuffle = false;
        }

        if (!due) {
            due = false;
        }
        let res = await fetch(`${this.url}/leetcodeproblems?shuffle=${shuffle}&due=${due}`);
        return res.json();
    }

    addQuestion = async (problem : LeetcodeProblem) : Promise<LeetcodeProblem> =>  {
        let res = await fetch(`${this.url}/leetcodeproblems`, {
            method: 'POST',
            headers: {
                'content-type' : 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(problem)
        });

        return res.json();
    }

    getCategories = async () : Promise<string[]> => {
        let res = await fetch(`${this.url}/leetcodeproblems/categories`);
        return res.json();
    }

    updateQuestion = async(problem : LeetcodeProblem) : Promise<LeetcodeProblem> => {
        let res = await fetch(`${this.url}/leetcodeproblems/${problem.id}`, {
            method: 'PUT',
            headers: {
                'content-type' : 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(problem)
        });

        return res.json();
    }

    deleteQuestion = async(problem : LeetcodeProblem) => {
        await fetch(`${this.url}/leetcodeproblems/${problem.id}`, {
            method: 'DELETE',
            headers: {
                'content-type' : 'application/json;charset=UTF-8',
            },
        });
    }

}