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

    // const checkAvailablity = isLiftBusy.every((lift) => {
    //     return lift === true;
    // })
    // if (checkAvailablity) {
    //     console.log(`checkAvailablity is true`);
    //     alert('Lifts are busy, please wait!')
    //     return;
    // }
    isLiftBusy[liftNum] = true;

    lifts[liftNum].style.transform = `translateY(-${floor * 20}rem)`
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

        // setTimeout(() => {
        //     console.log(queue);
        // }, 3000)

        setTimeout(() => {
            isLiftBusy[liftNum] = false;
        }, 4000)
    }, 4000)
    liftPos[liftNum] = +floor;
}

function callLift(i, totalFloors, liftPos, isLiftBusy) {
    const up_btn = document.querySelectorAll('.up_btn');
    const down_btn = document.querySelectorAll('.down_btn');

    up_btn.forEach((btn, id) => {
        if (i == id) {
            btn.addEventListener('click', () => {
                const calledFloor = `${totalFloors - id}`;

                // queue.push(+calledFloor);

                if (liftPos[0] === 0) {
                    if (isLiftBusy[0] === false)
                        moveLift(calledFloor, 0, liftPos, isLiftBusy);
                }
                else {
                    // console.log(`moving another`);
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

                    if (isLiftBusy[ind] === false)
                        moveLift(calledFloor, ind, liftPos, isLiftBusy);
                    else {
                        alert(`Lifts are busy. Please wait!`)
                        queue.push(calledFloor)
                    }

                    // if (queue.length > 0) {
                    //     let whichLift;
                    //     setTimeout(() => {
                    //         for (let i of isLiftBusy) {
                    //             console.log(i);
                    //             if (i === false)
                    //                 whichLift = i;
                    //         }
                    //         console.log(whichLift);
                    //         // moveLift(queue[0], whichLift, liftPos, isLiftBusy, queue)
                    //         queue.shift();
                    //     }, 10000)
                    // }

                    // let lift = Number.NEGATIVE_INFINITY;
                    // function queueListener() {
                    //     for (i of isLiftBusy) {
                    //         if (i === false) {
                    //             lift = i;
                    //         }
                    //     }
                    //     setTimeout(queueListener, 1000);

                    // }
                    // console.log(lift)
                    // setTimeout(queueListener, 1000);

                    // console.log(`queue = ${queue}`);
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
                    let diff = [];
                    for (let y of liftPos)
                        diff.push(Math.abs(y - (+(calledFloor))))

                    let mini = 100, ind = -1;
                    for (let d = 0; d < diff.length; d++) {
                        if (diff[d] < mini && isLiftBusy[d] !== true) {
                            mini = diff[d];
                            ind = d;
                        }
                        else continue;
                    }
                    if (isLiftBusy[ind] === false)
                        moveLift(calledFloor, ind, liftPos, isLiftBusy);
                    else {
                        alert(`Lifts are busy. Please wait!`)
                        queue.push(calledFloor)
                    }
                }
            })
        }
    })
}

const createFloor = (totalFloors, totalLifts) => {
    let liftDiv = document.getElementById('liftDiv')
    liftDiv.innerHTML = '';

    let liftPos = Array(+totalLifts).fill(0);
    let isLiftBusy = Array(+totalLifts).fill(false);


    for (var i = 0; i <= totalFloors; i++) {
        let floor = document.createElement('div')

        let floorInfo = document.createElement('div')
        let floorNum = document.createElement('p')
        let upBtn = document.createElement('button')
        let downBtn = document.createElement('button')

        floor.setAttribute('class', 'floor')
        floorInfo.setAttribute('class', 'floorInfo')
        upBtn.setAttribute('class', 'up_btn')
        downBtn.setAttribute('class', 'down_btn')

        floorNum.innerHTML = `Floor ${totalFloors - i}`
        upBtn.innerHTML = `Up`
        downBtn.innerHTML = `Down`

        liftDiv.appendChild(floor)
        floor.appendChild(floorInfo)
        floorInfo.append(floorNum, upBtn, downBtn);

        if (i == totalFloors) {
            floor.setAttribute('id', 'groundFloor')
            setTimeout(() => {
                addLifts(totalLifts)
            }, 1000)
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
    }
    createFloor(floorVal, liftVal)
})

 // const dynamicKeyframes = `
    // @keyframes myAnimation {
    //       from { transform: translateY(0); }
    //       to { transform: translateY(-${floor * 20}rem); }
    //     }`;

    // const styleSheet = document.createElement('style');
    // styleSheet.innerHTML = dynamicKeyframes;
    // document.head.appendChild(styleSheet);

    // Apply animation styles
    // lifts[liftNum].style.animationName = 'myAnimation';
    // lifts[liftNum].style.animationDuration = '2.5s';
    // lifts[liftNum].style.animationFillMode = 'forwards';

