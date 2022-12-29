import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  generateRandomInteger(min, max): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generateRandomDataArray() {
    let data = [];
    for (let i = 0; i < 12; i++) {
      let num = this.generateRandomInteger(1, 25);
      data.push(num);
    }
    return data;
  }

  createDb() {
    const heroes = [
      new Hero(11, 'Antman', 'antman', 'This is ant man.', 'Male', Array(3), 
      {
        "personalStats": {
          height: '0’2”',
          weight: '0.5 lbs',
          chest: '0.42 in',
          arms: '0.17 in',
          waist: '0.35 in',
          thighs: '0.27 in'
        },
        "crimesSolvedStats": {
          lineData: this.generateRandomDataArray()
        }
      }),
      new Hero(12, 'Batman', 'batman', 'This is bat man.', 'Male', Array(4), 
      {
        "personalStats": {
          height: '6’2”',
          weight: '210 lbs',
          chest: '42 in',
          arms: '17 in',
          waist: '35 in',
          thighs: '27 in'
        },
        "crimesSolvedStats": {
          lineData: this.generateRandomDataArray()
        }
      }),
      new Hero(13, 'Hulk', 'hulk', 'This is hulk.', 'Male', Array(5), 
      {
        "personalStats": {
          height: '7’0”',
          weight: '1040 lbs',
          chest: '102 in',
          arms: '68 in',
          waist: '85 in',
          thighs: '66 in'
        },
        "crimesSolvedStats": {
          lineData: this.generateRandomDataArray()
        }
      }),
      new Hero(14, 'Ironman', 'ironman', 'This is iron man.', 'Male', Array(4), 
      {
        "personalStats": {
          height: '5’11”',
          weight: '190 lbs',
          chest: '38 in',
          arms: '13 in',
          waist: '32 in',
          thighs: '22 in'
        },
        "crimesSolvedStats": {
          lineData: this.generateRandomDataArray()
        }
      }),
      new Hero(15, 'Spiderman', 'spiderman', 'This is spider man.', 'Male', Array(5), 
      {
        "personalStats": {
          height: '5’10”',
          weight: '167 lbs',
          chest: '34 in',
          arms: '13 in',
          waist: '28 in',
          thighs: '22 in'
        },
        "crimesSolvedStats": {
          lineData: this.generateRandomDataArray()
        }
      }),
      new Hero(16, 'Superman', 'superman', 'This is super man.', 'Male', Array(5),
      {
        "personalStats": {
          height: '6’3”',
          weight: '235 lbs',
          chest: '46 in',
          arms: '18 in',
          waist: '37 in',
          thighs: '27 in'
        },
        "crimesSolvedStats": {
          lineData: this.generateRandomDataArray()
        }
      }),
      new Hero(17, 'Wonderwoman', 'wonderwoman', 'This is wonder woman.', 'Female', Array(3), 
      {
        "personalStats": {
          height: '5’8”',
          weight: '155 lbs',
          chest: '36 in',
          arms: '11 in',
          waist: '27 in',
          thighs: '19 in'
        },
        "crimesSolvedStats": {
          lineData: this.generateRandomDataArray()
        }
      }),
      new Hero(18, 'Green lantern', 'greenlantern', 'This is green lantern.', 'Male', Array(3), 
      {
        "personalStats": {
          height: '6’0”',
          weight: '200 lbs',
          chest: '43 in',
          arms: '15 in',
          waist: '30 in',
          thighs: '24 in'
        },
        "crimesSolvedStats": {
          lineData: this.generateRandomDataArray()
        }
      }),
      new Hero(19, 'Mocking bird', 'mockingbird', 'This is mocking bird.', 'Female', Array(3), 
      {
        "personalStats": {
          height: '5’8”',
          weight: '150 lbs',
          chest: '34 in',
          arms: '10 in',
          waist: '27 in',
          thighs: '18 in'
        },
        "crimesSolvedStats": {
          lineData: this.generateRandomDataArray()
        }
      }),
      new Hero(20, 'Black widow', 'blackwidow', 'This is black widow.', 'Female', Array(4), 
      {
        "personalStats": {
          height: '5’6”',
          weight: '145 lbs',
          chest: '35 in',
          arms: '10 in',
          waist: '26 in',
          thighs: '18 in'
        },
        "crimesSolvedStats": {
          lineData: this.generateRandomDataArray()
        }
      }),
      new Hero(21, 'New hero', 'default', 'This is default hero.', 'Male', Array(2), 
      {
        "personalStats": {
          height: '5’10”',
          weight: '175 lbs',
          chest: '41 in',
          arms: '16 in',
          waist: '32 in',
          thighs: '22 in'
        },
        "crimesSolvedStats": {
          lineData: this.generateRandomDataArray()
        }
      })
    ];

    return {heroes};
  }
}
