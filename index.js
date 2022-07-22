const fs = require('fs');
const path= require('path');
const Train = require('./Train');

const train = new Train();

class Vehicle {

	constructor(data){

		this.data = data;
		this.station_after_merge = {
			"HYB": 0, "NGP": 400, "ITJ": 700, "BPL": 800,
			"AGA": 2500, "NDL": 2700, "PTA": 3800, "NJP": 4200, "GHY": 4700
		}
		this.DeptTrain = [];
		this.deptTrain1 = [];
		this.deptTrain2 = [];
	}

	main(data){
		let input = data.toString().split('\n');
		input = input.filter(str => str.replace(/\s+/g, ' ').length != 0 );
		for(let i = 0; i < input.length; i++){
			if(input){
			let line = input[i].split(' ')
			switch(line[0]){
				case 'TRAIN_A': 
					this.deptTrain1 = train.printTrainA(line)
					break
				case 'TRAIN_B': 
					this.deptTrain2 = train.printTrainB(line)	
					break
				}
			}
		}
		let startBoggie = ['DEPARTURE', 'TRAIN_AB', 'ENGINE', 'ENGINE']
        this.DeptTrain = this.deptTrain1.concat(this.deptTrain2)
        this.DeptTrain = this.DeptTrain.sort((a, b) => b.id - a.id);
        let boggieListToArray = [];
        for (let i = 0; i < this.DeptTrain.length; i++) {
            if (this.DeptTrain[i].id != 0) {
                boggieListToArray.push(this.DeptTrain[i].name)
            }
        }
        let boggieList = startBoggie.concat(boggieListToArray);
        let boggie = boggieList.toString()
        const search = ',';
        const replaceWith = ' ';
        let result = boggie.split(search).join(replaceWith);
        result = result.replace("HYB", "");
        console.log(result.trim())

	}
}

let inputData = fs.readFileSync(path.join(__dirname, './input.txt')).toString();
let train1 = new Vehicle();
train1.main(inputData);