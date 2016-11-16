import {Component, OnInit} from '@angular/core';
import {VwColabSituacaoQtde} from './charts/vwColabSituacaoQtde';
import {VwColabCargoQtde} from './charts/vwColabCargoQtde';
import {VwColabCidadeQtde} from './charts/vwColabCidadeQtde';
import {VwColabQtdeService} from './charts/vwColabQtdeService';
import {VwColabGerenteQtde} from './charts/vwColabGerenteQtde';
import {VwColabCoordenadorQtde} from './charts/vwColabCoordenadorQtde';

@Component({
    templateUrl: 'app/app.home.html',
    selector: 'home-app'
})
export class AppHome implements OnInit {
    private errorMessage: string;
    private colorList: string[] = [
        "#4BB2C5",
        "#EAA228",
        "#C5B47F",
        "#579575",
        "#839557",
        "#958C12",
        "#953579",
        "#4B5DE4",
        "#D8B83F",
        "#FF5800",
    ]

    private vwColabSituacaoQtdeOperList: VwColabSituacaoQtde[];
    vwColabSituacaoQtdeOperChart: any;
    private vwColabSituacaoQtdeOperLabel: Array<string> = new Array<string>();
    private vwColabSituacaoQtdeOperAmount: Array<number> = new Array<number>();

    private vwColabSituacaoQtdeStaffList: VwColabSituacaoQtde[];
    vwColabSituacaoQtdeStaffChart: any;
    private vwColabSituacaoQtdeStaffLabel: Array<string> = new Array<string>();
    private vwColabSituacaoQtdeStaffAmount: Array<number> = new Array<number>();

    private vwColabSituacaoQtdeTotalList: VwColabSituacaoQtde[];
    vwColabSituacaoQtdeTotalChart: any;
    private vwColabSituacaoQtdeTotalLabel: Array<string> = new Array<string>();
    private vwColabSituacaoQtdeTotalAmount: Array<number> = new Array<number>();

    private vwColabCargoQtdeList: VwColabCargoQtde[];
    vwColabCargoQtdeChart: any;
    private vwColabCargoQtdeLabel: Array<string> = new Array<string>();
    private vwColabCargoQtdeAmount: Array<number> = new Array<number>();

    private vwColabCidadeQtdeList: VwColabCidadeQtde[];
    vwColabCidadeQtdeChart: any;
    private vwColabCidadeQtdeLabel: Array<string> = new Array<string>();
    private vwColabCidadeQtdeAmount: Array<number> = new Array<number>();

    private vwColabGerenteQtdeList: VwColabGerenteQtde[];
    vwColabGerenteQtdeChart: any;
    private vwColabGerenteQtdeLabel: Array<string> = new Array<string>();
    private vwColabGerenteQtdeAmount: Array<number> = new Array<number>();

    private vwColabCoordenadorQtdeList: VwColabCoordenadorQtde[];
    vwColabCoordenadorQtdeChart: any;
    private vwColabCoordenadorQtdeLabel: Array<string> = new Array<string>();
    private vwColabCoordenadorQtdeAmount: Array<number> = new Array<number>();

    displayOperChart: boolean = false;
    displayStaffChart: boolean = false;
    displayTotalChart: boolean = false;
    displayCargoChart: boolean = false;
    displayCidadeChart: boolean = false;
    displayGerenteChart: boolean = false;
    displayCoordenadorChart: boolean = false;

    constructor(
        private vwColabQtdeService: VwColabQtdeService) {
        this.createVwColabSituacaoQtdeOperChart();
        this.createVwColabSituacaoQtdeStaffChart();
        this.createVwColabSituacaoQtdeTotalChart();
        this.createVwColabCargoQtdeChart();
        this.createVwColabCidadeQtdeChart();
        this.createVwColabGerenteQtdeChart();
        this.createVwColabCoordenadorQtdeChart();
    }

    ngOnInit() {
        this.getVwColabSituacaoQtdeList();
    }

    getVwColabSituacaoQtdeList() {
        this.vwColabQtdeService.getVwColabSituacaoQtdeOper().subscribe(
            vwColabSituacaoQtdeOperList => this.vwColabSituacaoQtdeOperList = vwColabSituacaoQtdeOperList,
            error => this.errorMessage = <any>error,
            () => {
                for (let entry of this.vwColabSituacaoQtdeOperList) {
                    this.vwColabSituacaoQtdeOperAmount.push(entry.quantidade);
                    this.vwColabSituacaoQtdeOperLabel.push(entry.situacao);
                }
                this.createVwColabSituacaoQtdeOperChart();
                console.log(this.vwColabSituacaoQtdeOperList);
            }
        );
        this.vwColabQtdeService.getVwColabSituacaoQtdeStaff().subscribe(
            vwColabSituacaoQtdeStaffList => this.vwColabSituacaoQtdeStaffList = vwColabSituacaoQtdeStaffList,
            error => this.errorMessage = <any>error,
            () => {
                for (let entry of this.vwColabSituacaoQtdeStaffList) {
                    this.vwColabSituacaoQtdeStaffAmount.push(entry.quantidade);
                    this.vwColabSituacaoQtdeStaffLabel.push(entry.situacao);
                }
                this.createVwColabSituacaoQtdeStaffChart();
            }
        );
        this.vwColabQtdeService.getVwColabSituacaoQtdeTotal().subscribe(
            vwColabSituacaoQtdeTotalList => this.vwColabSituacaoQtdeTotalList = vwColabSituacaoQtdeTotalList,
            error => this.errorMessage = <any>error,
            () => {
                for (let entry of this.vwColabSituacaoQtdeTotalList) {
                    this.vwColabSituacaoQtdeTotalAmount.push(entry.quantidade);
                    this.vwColabSituacaoQtdeTotalLabel.push(entry.situacao);
                }
                this.createVwColabSituacaoQtdeTotalChart();
            }
        );
        this.vwColabQtdeService.getVwColabCargoQtde().subscribe(
            vwColabCargoQtdeList => this.vwColabCargoQtdeList = vwColabCargoQtdeList,
            error => this.errorMessage = <any>error,
            () => {
                for (let entry of this.vwColabCargoQtdeList) {
                    this.vwColabCargoQtdeAmount.push(entry.quantidade);
                    this.vwColabCargoQtdeLabel.push(entry.cargo);
                }
                this.createVwColabCargoQtdeChart();
            }
        );
        this.vwColabQtdeService.getVwColabCidadeQtde().subscribe(
            vwColabCidadeQtdeList => this.vwColabCidadeQtdeList = vwColabCidadeQtdeList,
            error => this.errorMessage = <any>error,
            () => {
                for (let entry of this.vwColabCidadeQtdeList) {
                    this.vwColabCidadeQtdeAmount.push(entry.quantidade);
                    this.vwColabCidadeQtdeLabel.push(entry.cidade);
                }
                this.createVwColabCidadeQtdeChart();
            }
        );
        this.vwColabQtdeService.getVwColabGerenteQtde().subscribe(
            vwColabGerenteQtdeList => this.vwColabGerenteQtdeList = vwColabGerenteQtdeList,
            error => this.errorMessage = <any>error,
            () => {
                for (let entry of this.vwColabGerenteQtdeList) {
                    this.vwColabGerenteQtdeAmount.push(entry.quantidade);
                    this.vwColabGerenteQtdeLabel.push(entry.gerente);
                }
                this.createVwColabGerenteQtdeChart();
            }
        );
        this.vwColabQtdeService.getVwColabCoordenadorQtde().subscribe(
            vwColabCoordenadorQtdeList => this.vwColabCoordenadorQtdeList = vwColabCoordenadorQtdeList,
            error => this.errorMessage = <any>error,
            () => {
                for (let entry of this.vwColabCoordenadorQtdeList) {
                    this.vwColabCoordenadorQtdeAmount.push(entry.quantidade);
                    this.vwColabCoordenadorQtdeLabel.push(entry.coordenador);
                }
                this.createVwColabCoordenadorQtdeChart();
            }
        );
    }

    createVwColabSituacaoQtdeOperChart() {
        this.vwColabSituacaoQtdeOperChart = {
            labels: this.vwColabSituacaoQtdeOperLabel,
            datasets: [
                {
                    data: this.vwColabSituacaoQtdeOperAmount,
                    backgroundColor: this.colorList,
                    hoverBackgroundColor: this.colorList
                }]
        }
    }

    createVwColabSituacaoQtdeStaffChart() {
        this.vwColabSituacaoQtdeStaffChart = {
            labels: this.vwColabSituacaoQtdeStaffLabel,
            datasets: [
                {
                    data: this.vwColabSituacaoQtdeStaffAmount,
                    backgroundColor: this.colorList,
                    hoverBackgroundColor: this.colorList
                }]
        }
    }

    createVwColabSituacaoQtdeTotalChart() {
        this.vwColabSituacaoQtdeTotalChart = {
            labels: this.vwColabSituacaoQtdeTotalLabel,
            datasets: [
                {
                    data: this.vwColabSituacaoQtdeTotalAmount,
                    backgroundColor: this.colorList,
                    hoverBackgroundColor: this.colorList
                }]
        }
    }

    createVwColabCargoQtdeChart() {
        this.vwColabCargoQtdeChart = {
            labels: this.vwColabCargoQtdeLabel,
            datasets: [
                {
                    data: this.vwColabCargoQtdeAmount,
                    backgroundColor: this.colorList,
                    hoverBackgroundColor: this.colorList
                }]
        }
    }

    createVwColabCidadeQtdeChart() {
        this.vwColabCidadeQtdeChart = {
            labels: this.vwColabCidadeQtdeLabel,
            datasets: [
                {
                    data: this.vwColabCidadeQtdeAmount,
                    backgroundColor: this.colorList,
                    hoverBackgroundColor: this.colorList
                }]
        }
    }

    createVwColabGerenteQtdeChart() {
        this.vwColabGerenteQtdeChart = {
            labels: this.vwColabGerenteQtdeLabel,
            datasets: [
                {
                    data: this.vwColabGerenteQtdeAmount,
                    backgroundColor: this.colorList,
                    hoverBackgroundColor: this.colorList
                }]
        }
    }

    createVwColabCoordenadorQtdeChart() {
        this.vwColabCoordenadorQtdeChart = {
            labels: this.vwColabCoordenadorQtdeLabel,
            datasets: [
                {
                    data: this.vwColabCoordenadorQtdeAmount,
                    backgroundColor: this.colorList,
                    hoverBackgroundColor: this.colorList
                }]
        }
    }

    showOperDialog() {
        this.displayOperChart = true;
    }

    showStaffDialog() {
        this.displayStaffChart = true;
    }

    showTotalDialog() {
        this.displayTotalChart = true;
    }

    showCargoDialog() {
        this.displayCargoChart = true;
    }

    showCidadeDialog() {
        this.displayCidadeChart = true;
    }

    showGerenteDialog() {
        this.displayGerenteChart = true;
    }

    showCoordenadorDialog() {
        this.displayCoordenadorChart = true;
    }
}