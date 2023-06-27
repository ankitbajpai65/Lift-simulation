const addLifts = (totalLifts) => {
    const ground = document.getElementById('groundFloor')

    // const liftWrapper = document.createElement('div');
    // ground.appendChild(liftWrapper);
    // liftWrapper.setAttribute('id', 'liftWrapper')

    for (let i = 0; i < totalLifts; i++) {
        const lifts = document.createElement('div');
        const liftDoor1 = document.createElement('span');
        const liftDoor2 = document.createElement('span');

        ground.appendChild(lifts)
        lifts.append(liftDoor1, liftDoor2)

        lifts.setAttribute('class', 'lifts')
        liftDoor1.setAttribute('class', 'liftDoor')
        liftDoor2.setAttribute('class', 'liftDoor')
    }
}

let queue = [];

const moveLift = (floor, liftNum, liftPos, isLiftBusy) => {
    const lifts = Array.from(document.querySelectorAll('.lifts'));
    const liftDoor = Array.from(document.querySelectorAll('.liftDoor'));

    isLiftBusy[liftNum] = true;

    let height = document.querySelectorAll('.floor')[0].offsetHeight;

    let time = `${Math.abs(floor - liftPos[liftNum]) * 2}`

    lifts[liftNum].style.transform = `translateY(-${floor * height / 10}rem)`
    lifts[liftNum].style.transition = `transform ${time}s ease-in-out 0s`;

    // console.log((+time + 2) * 1000);

    setTimeout(() => {
        console.log(`lift open`);
        liftDoor[2 * liftNum].style.transform = `translateX(-95%)`
        liftDoor[2 * liftNum].style.transition = `all 2s ease-in-out 1s`;

        liftDoor[2 * liftNum + 1].style.transform = `translateX(95%)`
        liftDoor[2 * liftNum + 1].style.transition = `all 2s ease-in-out 1s`;
    }, +time * 1000 + 500)

    setTimeout(() => {
        console.log(`lift close`);
        liftDoor[2 * liftNum].style.transform = `translateX(0%)`
        liftDoor[2 * liftNum].style.transition = `all 2s ease-in-out 1s`;

        liftDoor[2 * liftNum + 1].style.transform = `translateX(0%)`
        liftDoor[2 * liftNum + 1].style.transition = `all 2s ease-in-out 1s`;

        setTimeout(() => {
            isLiftBusy[liftNum] = false;
        }, 2500)
    }, (+time + 3.5) * 1000)

    liftPos[liftNum] = +floor;
}

function nearestFreeLift(calledFloor, liftPos, isLiftBusy) {
    let diff = [];
    for (let pos of liftPos)
        diff.push(Math.abs(pos - (+(calledFloor))))   // array containing distance from calledFloor
    // console.log(`diff ${diff}`);

    let mini = 100, ind = -1;
    for (let d = 0; d < diff.length; d++) {
        if (diff[d] < mini && isLiftBusy[d] === false) {
            mini = diff[d];
            ind = d;
        }
        else continue;
    }
    return ind;
}

function callLift(i, totalFloors, liftPos, isLiftBusy) {
    const up_btn = document.querySelectorAll('.up_btn');
    const down_btn = document.querySelectorAll('.down_btn');

    up_btn.forEach((btn, id) => {
        if (i == id) {
            btn.addEventListener('click', () => {
                const calledFloor = `${totalFloors - id}`;

                if (liftPos[0] === 0) {
                    if (isLiftBusy[0] === false)
                        moveLift(calledFloor, 0, liftPos, isLiftBusy);
                }
                else {
                    let ind = nearestFreeLift(calledFloor, liftPos, isLiftBusy);

                    if (isLiftBusy[ind] === false)
                        moveLift(calledFloor, ind, liftPos, isLiftBusy);
                    else {
                        // alert(`Lifts are busy. Please wait! it will come to you`);
                        if (!queue.includes(calledFloor))
                            queue.push(calledFloor)

                        let timeout = setInterval(() => {
                            let ankit = isLiftBusy.some((lift) => {
                                return lift === false
                            })
                            if (ankit && queue.length > 0) {
                                let ind = nearestFreeLift(queue[0], liftPos, isLiftBusy);

                                moveLift(queue[0], ind, liftPos, isLiftBusy);
                                queue.shift();
                                // console.log(queue);
                            }
                        }, 500)
                        if (queue.length === 0)
                            clearInterval(timeout)
                    }
                    console.log(`queue = ${queue}`);
                }
            })
        }
    })

    down_btn.forEach((btn, id) => {
        if (i == id) {
            btn.addEventListener('click', () => {
                const calledFloor = `${totalFloors - id}`;

                if (liftPos[0] === 0) {
                    if (isLiftBusy[0] === false)
                        moveLift(calledFloor, 0, liftPos, isLiftBusy);
                }
                else {
                    let ind = nearestFreeLift(calledFloor, liftPos, isLiftBusy);

                    if (isLiftBusy[ind] === false)
                        moveLift(calledFloor, ind, liftPos, isLiftBusy);
                    else {
                        // alert(`Lifts are busy. Please wait! it will come to you`);
                        if (!queue.includes(calledFloor))
                            queue.push(calledFloor)

                        let timeout = setInterval(() => {
                            let ankit = isLiftBusy.some((lift) => {
                                return lift === false
                            })
                            if (ankit && queue.length > 0) {
                                let ind = nearestFreeLift(queue[0], liftPos, isLiftBusy);

                                moveLift(queue[0], ind, liftPos, isLiftBusy);
                                queue.shift();
                            }
                        }, 500)
                        if (queue.length === 0)
                            clearInterval(timeout)
                    }
                }
                console.log(`queue = ${queue}`);
            })
        }
    })
}

const createFloor = (totalFloors, totalLifts) => {
    let liftDiv = document.getElementById('liftDiv')
    liftDiv.innerHTML = '';
    queue = [];

    let liftPos = Array(+totalLifts).fill(0);
    let isLiftBusy = Array(+totalLifts).fill(false);

    let floorInfo, floorNum, upBtn, downBtn;

    for (var i = 0; i <= totalFloors; i++) {
        let floor = document.createElement('div')

        floorInfo = document.createElement('div')
        floorNum = document.createElement('p')
        upBtn = document.createElement('button')
        downBtn = document.createElement('button')

        floor.setAttribute('class', 'floor')
        floorInfo.setAttribute('class', 'floorInfo')
        upBtn.setAttribute('class', 'up_btn')
        downBtn.setAttribute('class', 'down_btn')

        floorNum.innerHTML = `Floor ${totalFloors - i}`
        upBtn.innerHTML = `▲`
        downBtn.innerHTML = `▼`

        liftDiv.appendChild(floor)
        floor.appendChild(floorInfo)
        floorInfo.append(upBtn, floorNum, downBtn);

        if (i == totalFloors) {
            floor.setAttribute('id', 'groundFloor');
            addLifts(totalLifts);            // ADDING LIFTS TO THE GROUND FLOOR
        }

        // CALLING LIFT

        callLift(i, totalFloors, liftPos, isLiftBusy);
    }
}

const startBtn = document.getElementById(`startBtn`);
startBtn.addEventListener('click', (e) => {
    e.preventDefault();

    let floorVal = document.getElementById(`floorVal`).value;
    let liftVal = document.getElementById(`liftVal`).value;

    if (floorVal === '' || liftVal === '') {
        alert('Please enter the details!')
        return;
    } else if (floorVal < 1 || liftVal < 1) {
        alert('Please enter valid details!');
        return;
    }
    else if (liftVal > floorVal) {
        alert('Number of lifts can not be greater than number of floors!');
        return;
    }
    createFloor(floorVal, liftVal)
})


