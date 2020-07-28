
    var count = 0;
    var a = [
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1
    ];
    var numSquares = 9;
    var winConditions = [
        [
            0, 1, 2
        ],
        [
            3, 4, 5
        ],
        [
            6, 7, 8
        ],
        [
            0, 3, 6
        ],
        [
            1, 4, 7
        ],
        [
            2, 5, 8
        ],
        [
            0, 4, 8
        ],
        [
            2, 4, 6
        ]
    ];
    var gameOver = false;
    var winCells = [];

    if(location.port){
        var port = ":" + location.port;
    }else{
        var port = "";
    }
    console.log("port is "+port);
    // var socket = io.connect(location.protocol + '//' + document.domain);
    var socket = io.connect(location.protocol + '//' + document.domain + port);

    var messageBox = document.getElementById('message-box');

    socket.on('connect', function () {
        console.log("user conn");
    });


    var isChecked = function (ele) {
        return(ele.innerHTML == 'X' || ele.innerHTML == 'O');
    }

    var isWon = function () {

        for (var i = 0; i < winConditions.length; i++) {
            var cond = winConditions[i];
            if (a[cond[0]] != -1 && a[cond[1]] != -1 && a[cond[2]] != -1) {
                if (a[cond[0]] == a[cond[1]] && a[cond[1]] == a[cond[2]]) {
                    winCells = cond;
                    return true;
                }
            }
        }

        return false;
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    function updateMarker(jsonData) {

        // console.log(typeof data)
        data = JSON.parse(jsonData)
        if (data['pid'] == 'p1') {
            document.getElementById((data['idx']).toString()).innerHTML = 'O';
            a[data['idx']] = 0;
            messageBox.innerHTML = "Player 2 ( X ) turn";
            count += 1;

        } else {
            document.getElementById((data['idx']).toString()).innerHTML = 'X';
            a[data['idx']] = 1;
            messageBox.innerHTML = "Player 1 ( O ) turn";
            count += 1;
        }


        if (count >= 5 && isWon()) {

            messageBox.style.color = 'green';
            messageBox.style.backgroundColor = "#ffffff";
            messageBox.style.borderRadius = '25px';
            if (data['pid'] == 'p2') {
                messageBox.innerHTML = 'Player 2 ( X ) won the game !! 🎉';
            } else 
                messageBox.innerHTML = 'Player 1 ( O ) won the game !! 🎉';
             highlightWinner();
            gameOver = true;
            sleep(1000).then(() => {
                reset();
            })
        } else if (count == 9 && ! isWon()) {
            messageBox.style.color = 'green';
            messageBox.style.backgroundColor = "#ffffff";
            messageBox.style.borderRadius = '25px';
            gameOver = true;
            messageBox.style.color = 'red';
            messageBox.innerHTML = "DRAW !!"
            sleep(1000).then(() => {
                reset();
            })
        }

    }

    function getChar(ele) {

        var sendingData;
        if (! isChecked(ele)) {
            if (count & 1) {
                a[Number(ele.id)] = 1;
                ele.innerHTML = 'X';
                messageBox.innerHTML = "Player 1 ( O ) turn";
                sendingData = {
                    "idx": Number(ele.id),
                    "pid": 'p2'
                };

            } else {
                a[Number(ele.id)] = 0;
                ele.innerHTML = 'O';
                messageBox.innerHTML = "Player 2 ( X ) turn";
                sendingData = {
                    "idx": Number(ele.id),
                    "pid": 'p1'
                };
            } 
            
            socket.emit('json', JSON.stringify(sendingData), function(){
                console.log(sendingData);
            });

        }

    }

    socket.on('json', function (jsonData) {
        console.log("Got data");
        updateMarker(jsonData);
    });

    function highlightWinner() {

        for (var i = 0; i < winCells.length; i++) {
            document.getElementById((winCells[i]).toString()).style.border = "3px solid green";
        }
    }

    function reset() {
        for (var i = 0; i < numSquares; i++) {
            var cell = document.getElementById(i.toString());
            cell.innerHTML = '';
            cell.style.border = '';
            a[i] = -1;
            gameOver = false;
            count = 0;
            winCells = [];
            messageBox.style.color = '#ffffff';
            messageBox.innerHTML = "Player 1 ( O ) turn";

            messageBox.style.backgroundColor = "";
            messageBox.style.borderRadius = '25px';
        }
    }

