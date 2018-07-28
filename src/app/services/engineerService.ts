import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';

// import { GeneralURL } from '../utils/generealUrl';
// import { Generalkey } from '../utils/generalKey';

@Injectable()
export class EngineersService {

    constructor(/*private http: Http*/) {
    }

    public getEngineers() {
        return [
            {id: 1, name: "Bobur Zakirov", job: 'CEO', skills: ['Java', 'Developer', 'Tester'], jss: 84, imgLink: 'assets/images/Ulmas.jpg'},
            {id: 2, name: "Ulug'bek Bozorov", job: 'Mashinasoz enjiner', skills: ['Java', 'Developer', 'Tester'], jss: 77, imgLink: 'assets/images/Erlan.jpg'},
            {id: 3, name: "Anvar Xudoyberganov", job: 'Robototexnik', skills: ['Java', 'Developer', 'Tester'], jss: 93, imgLink: 'assets/images/dfd.jpg'},
            {id: 4, name: 'Khamidulla Khabibullaev', job: 'IT mutahassisi', skills: ['Java', 'Developer', 'Tester'], jss: 62, imgLink: 'assets/images/xamid.jpg'},
            {id: 5, name: 'Bobur Jumaniyozov', job: 'IT mutahassisi', skills: ['Java', 'Front-end Developer', 'Tester'], jss: 91, imgLink: 'assets/images/bobur.jpg'},
            {id: 6, name: 'Ulmas Zairov', job: 'Elektronshik', skills: ['Java', 'Front-end Developer', 'Tester'], jss: 100, imgLink: 'assets/images/Ulmas.jpg'},
            {id: 7, name: "Firdavs Ne'matzoda", job: 'Robototexnik', skills: ['Java', 'Front-end Developer', 'Tester'], jss: 83, imgLink: 'assets/images/dfd.jpg'},
            {id: 8, name: 'Erlan Javgashev', job: 'Dizayner', skills: ['Java', 'Front-end Developer', 'Tester'], jss: 65, imgLink: 'assets/images/Erlan.jpg'}
        ];
    }

    public getBestEngineers() {
        return [
            {id: 0, name: "Ulug'bek Bozorov", job: 'Mashinasoz enjiner', skills: ['Java', 'Front-end Developer', 'Tester'], jss: 77, imgLink: 'assets/images/Erlan.jpg'},
            {id: 1, name: "Anvar Xudoyberganov", job: 'Robototexnik', skills: ['Java', 'Front-end Developer', 'Tester'], jss: 93, imgLink: 'assets/images/dfd.jpg'},
            {id: 2, name: 'Khamidulla Khabibullaev', job: 'IT mutahassisi', skills: ['Java', 'Front-end Developer', 'Tester'], jss: 62, imgLink: 'assets/images/xamid.jpg'},
            {id: 3, name: 'Bobur Jumaniyozov', job: 'IT mutahassisi', skills: ['Java', 'Front-end Developer', 'Tester'], jss: 91, imgLink: 'assets/images/bobur.jpg'},
            {id: 4, name: "Firdavs Ne'matzoda", job: 'Robototexnik', skills: ['Java', 'Front-end Developer', 'Tester'], jss: 83, imgLink: 'assets/images/dfd.jpg'},
            {id: 5, name: 'Erlan Javgashev', job: 'Dizayner', skills: ['Java', 'Front-end Developer', 'Tester'], jss: 65, imgLink: 'assets/images/Erlan.jpg'}
        ];
    }

    public getEngineerInfo(engineerName: string) {
        
    }
}