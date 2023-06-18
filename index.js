const addLifts = (totalLifts) => {
    const ground = document.getElementById('groundFloor')

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

const moveLift = (floor, liftNum, liftPos, isLiftBusy, queue) => {
    // console.log(isLiftBusy);

    const lifts = Array.from(document.querySelectorAll('.lifts'));
    const liftDoor = Array.from(document.querySelectorAll('.liftDoor'));

    isLiftBusy[liftNum] = true;

    lifts[liftNum].style.transform = `translateY(-${floor * 16}rem)`
    lifts[liftNum].style.transition = 'transform 2s ease-in-out 0s';

    liftDoor[2 * liftNum].style.transform = `translateX(-95%)`
    liftDoor[2 * liftNum].style.transition = 'all 2s ease-in-out 2s';

    liftDoor[2 * liftNum + 1].style.transform = `translateX(95%)`
    liftDoor[2 * liftNum + 1].style.transition = 'all 2s ease-in-out 2s';

    setTimeout(() => {
        liftDoor[2 * liftNum].style.transform = `translateX(0%)`
        liftDoor[2 * liftNum].style.transition = 'all 2s ease-in-out 1s';

        liftDoor[2 * liftNum + 1].style.transform = `translateX(0%)`
        liftDoor[2 * liftNum + 1].style.transition = 'all 2s ease-in-out 1s';

        setTimeout(() => {
            isLiftBusy[liftNum] = false;
        }, 4000)
    }, 4000)

    liftPos[liftNum] = +floor;
}

function nearestLift(calledFloor, liftPos, isLiftBusy) {
    let diff = [];
    for (let pos of liftPos)
        diff.push(Math.abs(pos - (+(calledFloor))))   // array containing distance from calledFloor
    // console.log(`diff ${diff}`);

    let mini = 100, ind = -1;
    for (let d = 0; d < diff.length; d++) {
        if (diff[d] < mini && isLiftBusy[d] !== true) {
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
                    let ind = nearestLift(calledFloor, liftPos, isLiftBusy);

                    if (isLiftBusy[ind] === false)
                        moveLift(calledFloor, ind, liftPos, isLiftBusy);
                    else {
                        alert(`Lifts are busy. Please wait! it will come to you`);
                        queue.push(calledFloor)

                        let timeout = setInterval(() => {
                            let ankit = isLiftBusy.some((lift) => {
                                return lift === false
                            })
                            if (ankit && queue.length > 0) {
                                let ind = nearestLift(calledFloor, liftPos, isLiftBusy);

                                moveLift(calledFloor, ind, liftPos, isLiftBusy);
                                queue.shift();
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
                    let ind = nearestLift(calledFloor, liftPos, isLiftBusy);

                    if (isLiftBusy[ind] === false)
                        moveLift(calledFloor, ind, liftPos, isLiftBusy);
                    else {
                        alert(`Lifts are busy. Please wait! it will come to you`);
                        queue.push(calledFloor)

                        let timeout = setInterval(() => {
                            let ankit = isLiftBusy.some((lift) => {
                                return lift === false
                            })
                            if (ankit && queue.length > 0) {
                                let ind = nearestLift(calledFloor, liftPos, isLiftBusy);

                                moveLift(calledFloor, ind, liftPos, isLiftBusy);
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
        alert('Please enter valid details!')
        return;
    }
    createFloor(floorVal, liftVal)
})


