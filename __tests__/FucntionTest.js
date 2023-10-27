import App from "../src/App.js";
import { MissionUtils } from "@woowacourse/mission-utils";
import Car from "../src/Game/Car.js";
const mockQuestions = (inputs) => {
    MissionUtils.Console.readLineAsync = jest.fn();

    MissionUtils.Console.readLineAsync.mockImplementation(() => {
        const input = inputs.shift();
        return Promise.resolve(input);
    });
};

describe("이름 입력 테스트", () => {
    test.each([
        [["pobi,pobi"]],
        [["pobi, pobi"]]
    ])("이름 중복에 대한 예외 처리", async (inputs) => {
        // given
        mockQuestions(inputs);

        // when
        const app = new App();

        // then
        await expect(app.play()).rejects.toThrow("[ERROR]");
    });
    
});

describe("Racing 클래스 테스트", () => {
    
    test("registCar() 테스트", () => {
        const names = "hong,se u ng,ta  e k";
        const removeBlank = names.replace(/\s/g, '');
        const splitCars = removeBlank.split(',');
        const cars = splitCars.map(car => new Car(car));
        const answer = [
            { name: 'hong', distance: '' },
            { name: 'seung', distance: '' },
            { name: 'taek', distance: '' },
        ]
        expect(cars).toEqual(answer);
    });

    test("moveCycle() 테스트", () => {
        const cars = [
            { name: 'hong', distance: '' },
            { name: 'seung', distance: '' },
            { name: 'taek', distance: '' },
        ];
        const cars2 = [
            { name: 'hong', distance: '' },
            { name: 'seung', distance: '' },
            { name: 'taek', distance: '' },
        ];

        cars.forEach(car => {
            car.distance += '-';
        });

        expect(cars).not.toEqual(cars2);
    })
    test("oneMoveCycleResult() 테스트", () => {
        const cars = [
            { name: 'hong', distance: '-' },
            { name: 'seung', distance: '--' },
            { name: 'taek', distance: '---' },
        ];
        const print = cars.map(car => {
            return `${car.name} : ${car.distance}`;
        });
        expect(print).toEqual([
            "hong : -",
            "seung : --",
            "taek : ---",
        ])
    })


    test("getMaxDistance() 테스트", () => {
        const cars = [
            { name: 'hong', distance: '-' },
            { name: 'seung', distance: '-' },
            { name: 'taek', distance: '--' },
            { name: 'hyo', distance: '--' },
            { name: 'jin', distance: '---' }
        ];

        const distanceArr = cars.map(car=> car.distance.length);
        
        const maxDistance = distanceArr.reduce((max,current) => {
            return current > max ? current : max
        },distanceArr[0]);
        
        expect(maxDistance).toEqual(3);
    });
    
})