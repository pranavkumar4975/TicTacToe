let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn = true;
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const ResetGame = () => {
  turn = true;
  EnableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn) {
      box.innerText = "O";
      box.style.color = "red";
      turn = false;
    } else {
      box.innerText = "X";
      box.style.color = "blue";
      turn = true;
    }

    box.disabled = true;

    checkWinner();
  });
});

const DisableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const EnableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  if (winner === "Drawn") {
    msg.innerText = "Game is Drawn";
  } else {
    msg.innerText = `Congratulations Winner is ${winner}`;
  }
  msgContainer.classList.remove("hide");
  DisableBoxes();
};

const checkWinner = () => {
  let flag = true;
  let count = 0;
  for (let pattern of winPatterns) {
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    if (pos1val != "" && pos2val != "" && pos3val != "") {
      count += 3;
      if (pos1val === pos2val && pos2val === pos3val) {
        flag = false;
        showWinner(pos1val);
      }
    }
  }

  if (count == 24 && flag) {
    let res = "Drawn";
    showWinner(res);
  }
};

newGameBtn.addEventListener("click", ResetGame);
resetBtn.addEventListener("click", ResetGame);
